// import { Boom } from '@hapi/boom';
// import { Injectable } from '@nestjs/common';
// import makeWASocket, {
//   AnyMessageContent,
//   delay,
//   DisconnectReason,
//   downloadMediaMessage,
//   fetchLatestBaileysVersion,
//   getAggregateVotesInPollMessage,
//   makeCacheableSignalKeyStore,
//   makeInMemoryStore,
//   proto,
//   useMultiFileAuthState,
//   WAMessageContent,
//   WAMessageKey,
// } from '@whiskeysockets/baileys';
// import axios from 'axios';
// import NodeCache from 'node-cache';
// import { PDFExtract } from 'pdf.js-extract';
// import pdf from 'pdf-parse';
// import readline from 'readline';
// import { createConnection } from 'typeorm';

// import MAIN_LOGGER from './utils/logger';
// import { UpdateWhatsAppUserDto } from './whatsapp_users/dto/update-whatsapp-user.dto';
// import { WhatsappUser } from './whatsapp_users/entities/whatsapp-user.entity';
// // import { WhatsappUser } from './whatsapp_users/entities/whatsapp-user.entity';
// import { WhatsappUserService } from './whatsapp_users/whatsapp.users.service';
// const port = 5100;

// const pdfExtract = new PDFExtract();

// const Newreply =
//   '*Welcome to CVPap!*\n\nReply with option number to choose what you want:\n\n1. Revamp your current resume and customized it to match the job description.\n\n2. Create new Resume.\n\n3. Regenerate resume sample';
// const standardReply =
//   'Reply with option number to choose what you want:\n\n1. Revamp your current resume and customized it to match the job description.\n\n2. Create new Resume.\n\n3. Regenerate resume sample';
// const cvreply = 'Send your current cv in word or pdf format, together with the job description as the message';

// const logger = MAIN_LOGGER.child({});
// logger.level = 'info';

// const useStore = !process.argv.includes('--no-store');
// const doReplies = !process.argv.includes('--no-reply');
// const usePairingCode = process.argv.includes('--use-pairing-code');
// const useMobile = process.argv.includes('--mobile');
// let data: any;

// const baseurl = 'http://localhost:5000';

// // external map to store retry counts of messages when decryption/encryption fails
// // keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts

// const msgRetryCounterCache = new NodeCache();

// // Read line interface
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// const question = (text: string) => new Promise<string>((resolve) => rl.question(text, resolve));

// // the store maintains the data of the WA connection in memory
// // can be written out to a file & read from it
// const store = useStore ? makeInMemoryStore({ logger }) : undefined;
// store?.readFromFile('./baileys_store_multi.json');
// // save every 10s
// setInterval(() => {
//   store?.writeToFile('./baileys_store_multi.json');
// }, 10_000);

// @Injectable()
// class SocketClass {
//   private static instance: SocketClass;
//   usersService: WhatsappUserService;

//   public constructor() {
//     // this.usersService = new WhatsappUserService();
//     // this.startSock();
//   }

//   sock: any = null;

//   // static getInstance(): SocketClass {
//   //   if (!SocketClass.instance) {
//   //     SocketClass.instance = new SocketClass();
//   //   }

//   //   return SocketClass.instance;
//   // }

//   startSock: any = async () => {
//     const connection = await createConnection({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'admin',
//       database: 'testcv',
//       entities: [WhatsappUser],
//     });
//     //     POSTGRES_DB=testcv
//     // POSTGRES_USER=postgres
//     // POSTGRES_PASSWORD=admin
//     this.usersService = connection.getCustomRepository(WhatsappUserService);
//     const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info');
//     // fetch latest version of WA Web
//     const { version, isLatest } = await fetchLatestBaileysVersion();
//     console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);
//     // const realm = await createdb();
//     this.sock = makeWASocket({
//       version,
//       logger,
//       printQRInTerminal: !usePairingCode,
//       // mobile: useMobile,
//       auth: {
//         creds: state.creds,
//         /** caching makes the store faster to send/recv messages */
//         keys: makeCacheableSignalKeyStore(state.keys, logger),
//       },
//       msgRetryCounterCache,
//       generateHighQualityLinkPreview: true,
//       // ignore all broadcast messages -- to receive the same
//       // comment the line below out
//       // shouldIgnoreJid: jid => isJidBroadcast(jid),
//       // implement to handle retries & poll updates
//       getMessage,
//     });

//     store?.bind(this.sock.ev);

//     // Pairing code for Web clients
//     if (usePairingCode && !this.sock.authState.creds.registered) {
//       if (useMobile) {
//         throw new Error('Cannot use pairing code with mobile api');
//       }

//       const phoneNumber = await question('Please enter your mobile phone number:\n');
//       const code = await this.sock.requestPairingCode(phoneNumber);
//       console.log(`Pairing code: ${code}`);
//     }

//     const sendMessageWTyping = async (msg: AnyMessageContent, jid: string) => {
//       await this.sock.presenceSubscribe(jid);
//       await delay(500);

//       await this.sock.sendPresenceUpdate('composing', jid);
//       await delay(2000);

//       await this.sock.sendPresenceUpdate('paused', jid);

//       await this.sock.sendMessage(jid, msg);
//     };

//     // the process function lets you process all events that just occurred
//     // efficiently in a batch
//     this.sock.ev.process(
//       // events is a map for event name => event data
//       async (events) => {
//         // eslint-disable-next-line @typescript-eslint/no-this-alias
//         const self = this;
//         // const localRealm = realm
//         // something about the connection changed
//         // maybe it closed, or we received all offline message or connection opened
//         if (events['connection.update']) {
//           const update = events['connection.update'];
//           const { connection, lastDisconnect } = update;
//           if (connection === 'close') {
//             // reconnect if not logged out
//             if ((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
//               this.startSock();
//             } else {
//               console.log('Connection closed. You are logged out.');
//             }
//           }

//           console.log('connection update', update);
//         }

//         // credentials updated -- save them
//         if (events['creds.update']) {
//           await saveCreds();
//         }

//         if (events['labels.association']) {
//           console.log(events['labels.association']);
//         }

//         if (events['labels.edit']) {
//           console.log(events['labels.edit']);
//         }

//         if (events.call) {
//           console.log('recv call event', events.call);
//         }

//         // history received
//         if (events['messaging-history.set']) {
//           const { chats, contacts, messages, isLatest } = events['messaging-history.set'];
//           console.log(
//             `recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`,
//           );
//         }

//         // received a new message
//         if (events['messages.upsert']) {
//           const upsert = events['messages.upsert'];
//           // console.log('recv messages ', JSON.stringify(upsert, undefined, 2))

//           if (upsert.type === 'notify') {
//             for (const msg of upsert.messages) {
//               if (!msg.key.fromMe && doReplies) {
//                 let isNew = true;
//                 // const customerSchema = realm.objects(CustomerSchema);

//                 const customer = await this.usersService.findByNumber(msg.key.remoteJid);
//                 if (customer === undefined) {
//                   const user = new WhatsappUser();
//                   user.currentSession = '';
//                   user.lastCvDetails = '';
//                   user.whatsappName = msg.pushName;
//                   user.lastSessionSelection = '';
//                   user.whatsappNumber = msg.key.remoteJid;
//                   user.previewUrl = '';
//                   user.lastjobDescription = '';
//                   this.usersService.save(user);
//                 } else {
//                   isNew = false;
//                 }
//                 if (
//                   msg.message &&
//                   msg.message?.documentMessage &&
//                   (msg.message?.documentMessage.mimetype === 'application/pdf' ||
//                     msg.message?.documentMessage.mimetype === 'application/msword' ||
//                     msg.message?.documentMessage.mimetype === 'application/vnd.ms-word' ||
//                     (msg.message?.documentMessage.mimetype ===
//                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
//                       customer.lastSessionSelection === '1'))
//                 ) {
//                   const buffer = await downloadMediaMessage(
//                     msg,
//                     'buffer',
//                     {},
//                     {
//                       logger,
//                       // pass this so that baileys can request a reupload of media
//                       // that has been deleted
//                       reuploadRequest: this.sock.updateMediaMessage,
//                     },
//                   );
//                   const buff = Buffer.from(buffer);
//                   // const buff = fs.readFileSync(buffer);
//                   if (msg.message?.documentMessage.mimetype === 'application/pdf') {
//                     // pdfExtract.extractBuffer(buffer, {}, (err, data) => {
//                     //     if (err) return console.log(err);
//                     //     console.log(data);
//                     //     const allText = data?.pages.map(page => page.content).join('\n');
//                     //     console.log(allText)
//                     //   });
//                     pdf(buffer).then(async function (data: any) {
//                       // number of pages
//                       // console.log(data.numpages);
//                       // number of rendered pages
//                       // console.log(data.numrender);
//                       // PDF info
//                       // console.log(data.info);
//                       // PDF metadata
//                       // console.log(data.metadata);
//                       // PDF.js version
//                       // check https://mozilla.github.io/pdf.js/getting_started/
//                       // console.log(data.version);
//                       // PDF text
//                       console.log(msg);
//                       console.log(data.text);
//                       // realm.write(() => {
//                       //   // const customerSchema = realm.objects(CustomerSchema);
//                       //   const cust = customerSchema.find((cu: any) => cu.whatsappNumber == msg.key.remoteJid);
//                       //   if (cust) {
//                       //     cust.lastCvDetails = data.text;
//                       //     cust.currentSession = '1';
//                       //     cust.lastSessionSelection = '';
//                       //   }
//                       // });

//                       // const currentUser = await self.usersService.findByNumber(msg.key.remoteJid);
//                       // const user = new UpdateWhatsAppUserDto();
//                       // user.lastCvDetails = data.text;
//                       // user.currentSession = '1';
//                       // user.lastCvDetails = currentUser.lastCvDetails;
//                       // user.whatsappName = currentUser.whatsappName;
//                       // user.lastSessionSelection = currentUser.lastSessionSelection;
//                       // user.whatsappNumber = msg.key.remoteJid;
//                       // user.previewUrl = currentUser.previewUrl;
//                       // user.lastjobDescription = currentUser.lastSessionSelection;
//                       self.usersService.updateName(msg.key.remoteJid, {
//                         lastCvDetails: data.text,
//                         currentSession: '1',
//                       });

//                       // self.usersService.update(msg.key.remoteJid, user);
//                       await sendMessageWTyping(
//                         {
//                           text: 'Your CV has been recieved successfuly, Now send the job description you are applying for so that we can tailor your cv to match it.\n\nIf you just want to upgrade your cv without job description reply with *ok*',
//                         },
//                         msg.key.remoteJid!,
//                       );
//                     });
//                   }
//                   // console.log('replying to', msg.key.remoteJid)
//                   // const messageType = Object.keys (msg)[0]
//                   // console.log("****")
//                   // console.log(msg)
//                   // console.log("****")
//                 } else {
//                   console.log(msg);
//                   const currentUser = await self.usersService.findByNumber(msg.key.remoteJid);
//                   if (msg.message?.conversation === '1' || msg.message?.extendedTextMessage?.text === '1') {
//                     const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = currentUser.currentSession;
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     user.lastSessionSelection = '1';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     self.usersService.updateName(msg.key.remoteJid, { lastSessionSelection: '1' });
//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){
//                     await sendMessageWTyping({ text: cvreply }, msg.key.remoteJid!);
//                     return;
//                   }
//                   if (msg.message?.conversation === '2' || msg.message?.extendedTextMessage?.text === '2') {
//                     // const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = currentUser.currentSession;
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     // user.lastSessionSelection = '2';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     self.usersService.updateName(msg.key.remoteJid, { lastSessionSelection: '2' });
//                   }
//                   if (msg.message?.conversation === '3' || msg.message?.extendedTextMessage?.text === '3') {
//                     const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = currentUser.currentSession;
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     // user.lastSessionSelection = '3';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     // self.usersService.updateWhatsappUser(msg.key.remoteJid, user);
//                     self.usersService.updateName(msg.key.remoteJid, { lastSessionSelection: '3' });
//                     //TODO check if there is current preview then send it or reply with a message
//                   }
//                   if (
//                     currentUser &&
//                     currentUser.lastSessionSelection === '1' &&
//                     ((msg.message && msg.message?.conversation != '0') ||
//                       (msg.message?.extendedTextMessage && msg.message?.extendedTextMessage?.text != '0'))
//                   ) {
//                     // //TODO create reply with a create cv response
//                     // realm.write(() => {
//                     //     // const customerSchema = realm.objects(CustomerSchema);
//                     //     const cust = customerSchema.find( (cu: any)=> cu.whatsappNumber == msg.key.remoteJid);
//                     //     if(cust){
//                     //     cust.lastSessionSelection = "1"
//                     // }
//                     //   });

//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){
//                     await sendMessageWTyping(
//                       {
//                         text: `Please note, You had selected CV revamp and customization option in our conversation earlier\n\nKindly,${cvreply}\n\nReply with *0* to return Home`,
//                       },
//                       msg.key.remoteJid!,
//                     );
//                     return;
//                   }

//                   if (
//                     customer &&
//                     customer.currentSession === '1' &&
//                     ((msg.message &&
//                       msg.message?.conversation?.length &&
//                       msg.message?.conversation?.length <= 32 &&
//                       msg.message?.conversation !== '0' &&
//                       msg.message?.conversation.toLocaleLowerCase() !== 'ok' &&
//                       msg.message?.conversation.toLowerCase() !== 'okay') ||
//                       (msg.message?.extendedTextMessage &&
//                         msg.message?.extendedTextMessage?.text &&
//                         msg.message?.extendedTextMessage?.text.length &&
//                         msg.message?.extendedTextMessage?.text.length <= 32 &&
//                         msg.message?.extendedTextMessage?.text !== '0' &&
//                         msg.message?.extendedTextMessage?.text !== 'ok' &&
//                         msg.message?.extendedTextMessage?.text !== 'okay'))
//                   ) {
//                     // //TODO create reply with a create cv response
//                     // realm.write(() => {
//                     //     // const customerSchema = realm.objects(CustomerSchema);
//                     //     const cust = customerSchema.find( (cu: any)=> cu.whatsappNumber == msg.key.remoteJid);
//                     //     if(cust){
//                     //     cust.lastSessionSelection = "1"
//                     // }
//                     //   });

//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){
//                     await sendMessageWTyping(
//                       {
//                         text: `Dear ${
//                           msg.pushName ? msg.pushName : 'Customer'
//                         },\nKindly sent the job description of the position you are applying for. The message you have sent appears to be incomplete or not a valid job description due to its brevity.\nTo ensure that we tailor your CV to perfectly align with your career goals, it's crucial that we have a comprehensive job description.\n\nIf you wish to proceed with CV enhancement without a specific job description, please respond with *ok*\n\nIf you want to cancel your request reply with *0*\n\nShould you need any assistance or have further questions, please don't hesitate to reach out via 0791186712.\nLooking forward to assisting you further in your career journey.\nBest Regards,`,
//                       },
//                       msg.key.remoteJid!,
//                     );
//                     return;
//                   }

//                   if (
//                     customer &&
//                     customer.currentSession === '1' &&
//                     (msg.message?.conversation === '0' || msg.message?.extendedTextMessage?.text === '0')
//                   ) {
//                     // //TODO create reply with a create cv response
//                     // realm.write(() => {
//                     //   // const customerSchema = realm.objects(CustomerSchema);
//                     //   const cust = customerSchema.find((cu: any) => cu.whatsappNumber == msg.key.remoteJid);
//                     //   if (cust) {
//                     //     cust.lastSessionSelection = '1';
//                     //     cust.lastCvDetails = '';
//                     //   }
//                     // });
//                     // const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = '';
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     // user.lastSessionSelection = '';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     self.usersService.updateName(msg.key.remoteJid, { lastSessionSelection: '', currentSession: '' });
//                     // self.usersService.updateWhatsappUser(msg.key.remoteJid, user);
//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){
//                     await sendMessageWTyping({ text: standardReply }, msg.key.remoteJid!);
//                     return;
//                   }

//                   if (
//                     customer &&
//                     customer.currentSession === '1' &&
//                     (msg.message?.conversation?.toLowerCase() === 'okay' ||
//                       msg.message?.conversation?.toLowerCase() === 'ok' ||
//                       msg.message?.extendedTextMessage?.text?.toLowerCase() === 'ok' ||
//                       msg.message?.extendedTextMessage?.text?.toLowerCase() === 'okay')
//                   ) {
//                     // const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = '2';
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     // user.lastSessionSelection = 'okay';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     self.usersService.updateName(msg.key.remoteJid, {
//                       lastSessionSelection: 'ok',
//                       currentSession: '2',
//                     });
//                     // self.usersService.updateWhatsappUser(msg.key.remoteJid, user);
//                     // //TODO create reply with a create cv response
//                     // realm.write(() => {
//                     //   // const customerSchema = realm.objects(CustomerSchema);
//                     //   const cust = customerSchema.find((cu: any) => cu.whatsappNumber == msg.key.remoteJid);
//                     //   if (cust) {
//                     //     cust.lastSessionSelection = 'okay';
//                     //     cust.currentSession = '2';
//                     //   }
//                     // });
//                     //TODO sned request
//                     axios
//                       .post(
//                         `${baseurl}/api/v1/process-cv-okay`,
//                         (data = { cv_body: customer.lastCvDetails, whatsapp_number: msg.key.remoteJid }),
//                       )
//                       .then(async (resp) => {
//                         await sendMessageWTyping(
//                           {
//                             text: `Dear ${msg.pushName}, Your request to revamp your CV has been received successfully, and we are working on it; it may take a few minutes. Once done, we will send you a preview of the CV together with a link so that you can edit the content or download the PDF if satisfied. Thank you.`,
//                           },
//                           msg.key.remoteJid!,
//                         );
//                       })
//                       .catch(() => {
//                         console.log('error*********************');
//                       });
//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){

//                     return;
//                   }

//                   if (
//                     customer &&
//                     customer.lastSessionSelection === '1' &&
//                     (msg.message?.extendedTextMessage?.text === '0' || msg.message?.conversation === '0')
//                   ) {
//                     // //TODO create reply with a create cv response
//                     // realm.write(() => {
//                     //   // const customerSchema = realm.objects(CustomerSchema);
//                     //   const cust = customerSchema.find((cu: any) => cu.whatsappNumber == msg.key.remoteJid);
//                     //   if (cust) {
//                     //     cust.lastSessionSelection = '';
//                     //     cust.currentSession = '';
//                     //   }
//                     // });
//                     // const user = new UpdateWhatsAppUserDto();
//                     // user.lastCvDetails = data.text;
//                     // user.currentSession = '';
//                     // user.lastCvDetails = currentUser.lastCvDetails;
//                     // user.whatsappName = currentUser.whatsappName;
//                     // user.lastSessionSelection = '';
//                     // user.whatsappNumber = msg.key.remoteJid;
//                     // user.previewUrl = currentUser.previewUrl;
//                     // user.lastjobDescription = currentUser.lastSessionSelection;
//                     // self.usersService.updateWhatsappUser(msg.key.remoteJid, user);
//                     self.usersService.updateName(msg.key.remoteJid, { lastSessionSelection: '', currentSession: '' });
//                     await this.sock!.readMessages([msg.key]);
//                     //   if(isNew){
//                     await sendMessageWTyping({ text: standardReply }, msg.key.remoteJid!);
//                     return;
//                   }
//                   await this.sock!.readMessages([msg.key]);
//                   if (isNew) {
//                     await sendMessageWTyping({ text: Newreply }, msg.key.remoteJid!);
//                   } else {
//                     await sendMessageWTyping({ text: standardReply }, msg.key.remoteJid!);
//                   }
//                 }
//                 // await sock!.readMessages([msg.key])
//                 // await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid!);
//               }
//             }
//           }
//         }

//         // messages updated like status delivered, message deleted etc.
//         if (events['messages.update']) {
//           console.log(JSON.stringify(events['messages.update'], undefined, 2));

//           for (const { key, update } of events['messages.update']) {
//             if (update.pollUpdates) {
//               const pollCreation = await getMessage(key);
//               if (pollCreation) {
//                 console.log(
//                   'got poll update, aggregation: ',
//                   getAggregateVotesInPollMessage({
//                     message: pollCreation,
//                     pollUpdates: update.pollUpdates,
//                   }),
//                 );
//               }
//             }
//           }
//         }

//         if (events['message-receipt.update']) {
//           console.log(events['message-receipt.update']);
//         }

//         if (events['messages.reaction']) {
//           console.log(events['messages.reaction']);
//         }

//         if (events['presence.update']) {
//           console.log(events['presence.update']);
//         }

//         if (events['chats.update']) {
//           console.log(events['chats.update']);
//         }

//         if (events['contacts.update']) {
//           for (const contact of events['contacts.update']) {
//             if (typeof contact.imgUrl !== 'undefined') {
//               const newUrl =
//                 contact.imgUrl === null ? null : await this.sock!.profilePictureUrl(contact.id!).catch(() => null);
//               console.log(`contact ${contact.id} has a new profile pic: ${newUrl}`);
//             }
//           }
//         }

//         if (events['chats.delete']) {
//           console.log('chats deleted ', events['chats.delete']);
//         }
//       },
//     );

//     async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
//       if (store) {
//         const msg = await store.loadMessage(key.remoteJid!, key.id!);
//         return msg?.message || undefined;
//       }

//       // only if store is present
//       return proto.Message.fromObject({});
//     }
//   };
// }

// // const sock = startSock()

// // export default sock

// export default SocketClass;
