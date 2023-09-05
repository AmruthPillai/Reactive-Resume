import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
// import { WhatsappUsersModule } from './whatsapp_users/whatsapp.users.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const appUrl = configService.get('app.url');

  // Middleware
  app.enableCors({ origin: [appUrl], credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());

  // app.post('/api/v1/send-sample-image', async (req:Request, res:Response) => {

  // const number = req.body.number
  // const slug = req.body.slug
  // const cusername = req.body.username
  // console.log(req.body)
  // const realm = await createdb()
  // const customerSchema = realm.objects(CustomerSchema);
  // const cust = customerSchema.find( (cu: any)=> cu.whatsappNumber == number);
  // if(cust)
  // {realm.write(() => {
  // 	// const customerSchema = realm.objects(CustomerSchema);
  // 	const cust = customerSchema.find( (cu: any)=> cu.whatsappNumber == number);
  // 	if(cust){
  // 	cust.lastSessionSelection = ""
  // 	cust.currentSession = ""
  // 	cust.previewUrl = slug
  // }
  //   })}
  // console.log(cust)
  // })

  // app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
  // })

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Server Port
  const port = configService.get<number>('app.port');
  await app.listen(port);
  // const localApp = await NestFactory.createApplicationContext(WhatsappUsersModule);
  // You now have access to the NestJS context with the configured providers.
  // You can use this context to instantiate your `SocketClass`.
  // const socketClass = app.get(SocketClass);
  // const service = new WhatsappUserService();
  // const socketClass = new SocketClass();
  // await socketClass.startSock();
  Logger.log(`🚀 Server is up and running!`);
};

bootstrap();
