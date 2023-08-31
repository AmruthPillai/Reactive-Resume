// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { SchedulerRegistry } from '@nestjs/schedule';
// import { InjectRepository } from '@nestjs/typeorm';
// import { randomBytes } from 'crypto';
// import { DataSource, Repository } from 'typeorm';

// import { MailService } from '@/mail/mail.service';

// import { CreateWhatsappUserDto } from './dto/create--whatsapp-user.dto';
// import { UpdateWhatsAppUserDto } from './dto/update-whatsapp-user.dto';
// import { WhatsappUser } from './entities/whatsapp-user.entity';

// export const DELETION_TIME = 30 * 60 * 1000; // 30 minutes

// @Injectable()
// export class WhatsappUsersService {
//   constructor(
//     @InjectRepository(WhatsappUser) private userRepository: Repository<WhatsappUser>,
//     private schedulerRegistry: SchedulerRegistry,
//     private mailService: MailService,
//     private dataSource: DataSource,
//   ) {}

//   async findById(whatsappNumber: string): Promise<WhatsappUser> {
//     const user = await this.userRepository.findOne({ where: { whatsappNumber } });

//     if (user) {
//       return user;
//     }

//     throw new HttpException('A user with this username/email does not exist.', HttpStatus.NOT_FOUND);
//   }

//   // async findByEmail(email: string): Promise<User> {
//   //   const user = await this.userRepository.findOne({ where: { email } });

//   //   if (user) {
//   //     return user;
//   //   }

//   //   throw new HttpException('A user with this email does not exist.', HttpStatus.NOT_FOUND);
//   // }

//   // async findByIdentifier(identifier: string): Promise<User> {
//   //   const user = await this.userRepository.findOne({
//   //     where: [{ username: identifier }, { email: identifier }],
//   //   });

//   //   if (user) {
//   //     return user;
//   //   }

//   //   throw new HttpException('A user with this username/email does not exist.', HttpStatus.NOT_FOUND);
//   // }

//   // async findByResetToken(resetToken: string): Promise<User> {
//   //   const user = await this.userRepository.findOne({ where: { resetToken } });

//   //   if (user) {
//   //     return user;
//   //   }

//   //   throw new HttpException('The reset token provided may be invalid or expired.', HttpStatus.NOT_FOUND);
//   // }

//   async create(createWhatsappUserDto: CreateWhatsappUserDto): Promise<WhatsappUser> {
//     const user = this.userRepository.create(createWhatsappUserDto);

//     await this.userRepository.save(user);

//     return user;
//   }

//   async update(whatsappNumber: string, updateWhatsappUserDto: UpdateWhatsAppUserDto) {
//     const user = await this.findById(whatsappNumber);
//     const updatedUser = {
//       ...user,
//       ...updateWhatsappUserDto,
//     };

//     await this.userRepository.save(updatedUser);

//     return updatedUser;
//   }

//   async remove(whatsappNumber: string): Promise<void> {
//     await this.userRepository.delete(whatsappNumber);
//   }
// }

// Import the necessary dependencies
import { EntityRepository, Repository } from 'typeorm';

import { WhatsappUser } from './entities/whatsapp-user.entity';

// Define a service class that will handle WhatsappUser operations
// export class WhatsappUserService {
//   // Get the entity manager
//   private manager: EntityManager;

//   constructor() {
//     this.manager = getManager('postgresql://postgres:admin@localhost/testcv');
//   }

//   async createWhatsappUser(partial: Partial<WhatsappUser>): Promise<WhatsappUser> {
//     const user = new WhatsappUser(partial);
//     return await this.manager.save(user);
//   }

//   async updateWhatsappUser(whatsappNumber: string, partial: Partial<WhatsappUser>): Promise<WhatsappUser> {
//     const options: FindOneOptions<WhatsappUser> = {
//       where: { whatsappNumber: whatsappNumber },
//     };
//     const user = await this.manager.findOne(WhatsappUser, options);
//     if (!user) {
//       throw new Error(`User not found`);
//     }
//     Object.assign(user, partial);
//     return await this.manager.save(user);
//   }

//   async findWhatsappUser(whatsappNumber: string): Promise<WhatsappUser | undefined> {
//     const options: FindOneOptions<WhatsappUser> = {
//       where: { whatsappNumber: whatsappNumber },
//     };
//     return await this.manager.findOne(WhatsappUser, options);
//   }
// }

@EntityRepository(WhatsappUser)
export class WhatsappUserService extends Repository<WhatsappUser> {
  findByNumber(whatsappNumber: string) {
    return this.createQueryBuilder('whatsappuser')
      .where('whatsappuser.whatsappNumber = :whatsappNumber', { whatsappNumber })
      .getOne();
  }

  updateName(whatsappNumber: string, data: unknown) {
    const newData = {};
    for (const [key, value] of Object.keys(data)) {
      newData[key] = value;
    }
    return this.createQueryBuilder('whatsappuser')
      .update()
      .set(data)
      .where('whatsappuser.whatsappNumber = :whatsappNumber', { whatsappNumber })
      .execute();
  }
}
