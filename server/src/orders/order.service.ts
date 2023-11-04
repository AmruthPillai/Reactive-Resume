import { S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { ResumeService } from '@/resume/resume.service';
import { UsersService } from '@/users/users.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

export const SHORT_ID_LENGTH = 8;

@Injectable()
export class OrderService {
  private s3Client: S3Client;
  private s3Enabled: boolean;
  private mpesaSecretKey;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private configService: ConfigService,
    private usersService: UsersService,
    private resumeService: ResumeService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number, shortId: string) {
    try {
      const user = await this.usersService.findById(userId);
      const resume = await this.resumeService.findOneByShortId(shortId);

      const order = this.orderRepository.create({
        ...createOrderDto,
        user,
        resume,
      });

      return await this.orderRepository.save(order);
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A resume with the same slug already exists, please enter a unique slug and try again.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong. Please try again later, Or contact us if the issue persist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // return order
  }

  // findAll() {
  //   return this.resumeRepository.find();
  // }

  // findAllByUser(userId: number) {
  //   return this.resumeRepository.find({ where: { user: { id: userId } } });
  // }

  async findOne(username: string, shortId: string) {
    const today = new Date();
    const order = await this.orderRepository.findOne({
      where: {
        resume: {
          shortId: shortId,
        },
        user: { username: username },
        expiredDate: MoreThan(today),
        status: 'paid',
      },
    });

    if (order === null || order === undefined) {
      return null;
    }

    // const isPrivate = !resume.public;
    // const isNotOwner = resume.user.id !== userId;

    // if (isPrivate && isNotOwner) {
    //   throw new HttpException('The resume you are looking does not exist, or maybe never did?', HttpStatus.NOT_FOUND);
    // }

    return order;
  }
}
