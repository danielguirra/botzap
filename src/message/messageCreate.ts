import { MessageMedia } from 'whatsapp-web.js';

import { client } from '../client/client';
import { messageBuilder } from './builder';

export const message_create = client.on("message_create", async (message) => {


   try {
      const index = messageBodyVerifator(message.body)
      if (typeof index === 'number' && index >= 0) {
         const command = messageBuilder[index]
         if (command.url) {
            message.reply(await MessageMedia.fromUrl(
               command.url
            ));
         } if (command.content) {
            message.reply(command.content)
         }
      }

   } catch (error) {
      console.log(error)
   }

});


function messageBodyVerifator(body: string) {
   let indexCommand
   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (body.replace('*', '') === element.param) {
         indexCommand = index
         console.log('Command usado ' + element.param)
      }

   }

   return indexCommand
}