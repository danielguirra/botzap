

import { client } from '../client/client';
import { messageBuilder } from './builder';


export const message_create = client.on("message_create", async (message) => {

   try {
      const finder = findParam(message.body)
      if (finder === 'não existe um comando como esse') return
      else finder(message)

   } catch (error) {
      console.log(error)
   }

});


function findParam(param) {
   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (element.param === param) {
         return element.func
      } else continue
   }
   return 'não existe um comando como esse'
}