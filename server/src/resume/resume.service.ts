import { DeleteObjectCommand, PutObjectCommand, S3, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs/promises';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import sample from 'lodash/sample';
import set from 'lodash/set';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { Resume as ResumeSchema } from 'schema';
import { Repository } from 'typeorm';

import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { UsersService } from '@/users/users.service';

import { covers } from './data/covers';
import defaultState from './data/defaultState';
import sampleData from './data/sampleData';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';

export const SHORT_ID_LENGTH = 8;

@Injectable()
export class ResumeService {
  private s3Client: S3Client;
  private s3Enabled: boolean;

  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    this.s3Enabled = !isEmpty(configService.get('storage.bucket'));

    if (this.s3Enabled) {
      this.s3Client = new S3({
        endpoint: configService.get('storage.endpoint'),
        region: configService.get('storage.region'),
        credentials: {
          accessKeyId: configService.get('storage.accessKey'),
          secretAccessKey: configService.get('storage.secretKey'),
        },
      });
    }
  }

  async create(createResumeDto: CreateResumeDto, userId: number) {
    try {
      const user = await this.usersService.findById(userId);

      const shortId = nanoid(SHORT_ID_LENGTH);
      const image = `/images/covers/${sample(covers)}`;

      const resume = this.resumeRepository.create({
        ...defaultState,
        ...createResumeDto,
        shortId,
        image,
        user,
        basics: {
          ...defaultState.basics,
          name: user.name,
        },
      });

      return await this.resumeRepository.save(resume);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A resume with the same slug already exists, please enter a unique slug and try again.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async import(importResumeDto: Partial<ResumeSchema>, userId: number) {
    try {
      const user = await this.usersService.findById(userId);

      const shortId = nanoid(SHORT_ID_LENGTH);
      const image = `/images/covers/${sample(covers)}`;

      const resume = this.resumeRepository.create({
        ...defaultState,
        ...importResumeDto,
        shortId,
        image,
        user,
      });

      return this.resumeRepository.save(resume);
    } catch {
      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.resumeRepository.find();
  }

  findAllByUser(userId: number) {
    return this.resumeRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number, userId?: number) {
    const resume = await this.resumeRepository.findOne({ where: { id } });

    if (!resume) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    const isPrivate = !resume.public;
    const isNotOwner = resume.user.id !== userId;

    if (isPrivate && isNotOwner) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    return resume;
  }

  async findOneByShortId(shortId: string, userId?: number, secretKey?: string) {
    const resume = await this.resumeRepository.findOne({ where: { shortId } });

    if (!resume) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    const isPrivate = !resume.public;
    const isOwner = resume.user.id === userId;
    const isInternal = secretKey === this.configService.get('app.secretKey');

    if (!isInternal && isPrivate && !isOwner) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    return resume;
  }

  async findOneByIdentifier(username: string, slug: string, userId?: number, secretKey?: string) {
    const resume = await this.resumeRepository.findOne({ where: { user: { username }, slug } });

    if (!resume) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    const isPrivate = !resume.public;
    const isOwner = resume.user.id === userId;
    const isInternal = secretKey === this.configService.get('app.secretKey');

    if (!isInternal && isPrivate && !isOwner) {
      throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    }

    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto, userId: number) {
    const resume = await this.findOne(id, userId);

    const updatedResume = {
      ...resume,
      ...updateResumeDto,
    };

    return this.resumeRepository.save<Resume>(updatedResume);
  }

  remove(id: number, userId: number) {
    return this.resumeRepository.delete({ id, user: { id: userId } });
  }

  removeAllByUser(userId: number) {
    return this.resumeRepository.delete({ user: { id: userId } });
  }

  async duplicate(id: number, userId: number) {
    try {
      const originalResume = await this.findOne(id, userId);

      const shortId = nanoid(SHORT_ID_LENGTH);
      const image = `/images/covers/${sample(covers)}`;

      const duplicatedResume: Partial<Resume> = {
        ...pick(originalResume, ['name', 'slug', 'basics', 'metadata', 'sections', 'public']),
        name: `${originalResume.name} Copy`,
        slug: `${originalResume.slug}-copy`,
        shortId,
        image,
      };

      const resume = this.resumeRepository.create({
        ...duplicatedResume,
        user: { id: userId },
      });

      return this.resumeRepository.save(resume);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A resume with the same slug already exists, please enter a unique slug and try again.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sample(id: number, userId: number) {
    const resume = await this.findOne(id, userId);

    const sampleResume = { ...resume, ...sampleData };

    return this.resumeRepository.save<Resume>(sampleResume);
  }

  async reset(id: number, userId: number) {
    const resume = await this.findOne(id, userId);

    const prevResume = pick(resume, ['id', 'shortId', 'name', 'slug', 'image', 'user', 'createdAt']);
    const nextResume = { ...prevResume, ...defaultState };

    return this.resumeRepository.update(id, nextResume);
  }

  async uploadPhoto(id: number, userId: number, file: Express.Multer.File) {
    const resume = await this.findOne(id, userId);

    const filename = new Date().getTime() + extname(file.originalname);
    let updatedResume = null;

    if (this.s3Enabled) {
      const urlPrefix = this.configService.get('storage.urlPrefix');
      const key = `uploads/${userId}/${id}/${filename}`;
      const publicUrl = urlPrefix + key;
      await this.s3Client.send(
        new PutObjectCommand({
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
          Bucket: this.configService.get('storage.bucket'),
        }),
      );
      updatedResume = set(resume, 'basics.photo.url', publicUrl);
    } else {
      const path = `${__dirname}/../assets/uploads/${userId}/${id}/`;
      const serverUrl = this.configService.get('app.serverUrl');

      try {
        await fs.mkdir(path, { recursive: true });
        await fs.writeFile(path + filename, file.buffer);

        updatedResume = set(resume, 'basics.photo.url', `${serverUrl}/assets/uploads/${userId}/${id}/` + filename);
      } catch (error) {
        throw new HttpException(
          'Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.resumeRepository.save<Resume>(updatedResume);
  }

  async deletePhoto(id: number, userId: number) {
    const resume = await this.findOne(id, userId);
    const publicUrl = resume.basics.photo.url;

    if (!publicUrl || publicUrl === '') return;

    if (this.s3Enabled) {
      const urlPrefix = this.configService.get('storage.urlPrefix');
      const key = publicUrl.replace(urlPrefix, '');
      await this.s3Client.send(
        new DeleteObjectCommand({
          Key: key,
          Bucket: this.configService.get('storage.bucket'),
        }),
      );
    } else {
      const serverUrl = this.configService.get('app.serverUrl');
      const filePath = __dirname + '/..' + resume.basics.photo.url.replace(serverUrl, '');

      const isValidFile = (await fs.stat(filePath)).isFile();

      if (isValidFile) await fs.unlink(filePath);
    }

    const updatedResume = set(resume, 'basics.photo.url', '');

    return this.resumeRepository.save<Resume>(updatedResume);
  }
}
