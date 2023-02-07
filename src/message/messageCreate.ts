import { client } from '../client/client';
import { messageBuilder } from './builder';



export let status = process.env.status
let wellcomeStatus = true

export const message_create = client.on("message_create", async (message) => {

   try {
      if (message.body === 'sair' || message.body === '!sair') {
         status = 'off'
         await client.sendMessage(message.to, 'Sessão encerrada 👋')
         await client.sendMessage(message.to, `Quando precisar só mandar qualquer mensagem`)
         setTimeout(() => {
            wellcomeStatus = true
         }, 6000);
      }
      if (wellcomeStatus === true) {
         message.reply('Oi como posso ajudar ?')
         wellcomeStatus = false
      }

      if (status === 'off') return
      if (message.body.startsWith('!')) {
         let msg = message.body.replace('!', '')
         const finder = findParam(msg)
         if (finder === 'não existe um comando como esse') return
         else finder(message)
         setTimeout(() => {
            status = 'off'
            client.sendMessage(message.to, 'Sessão encerrada')
         }, 60000 * 5);
      } return



   } catch (error) {
      console.log(error)
   }

});


function findParam(param) {
   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (element.param === param) {
         return element.func
      } else {
         if (element.alias)
            element.alias.forEach((value => {
               if (value === param) {
                  return element.func
               }
            }))
         else continue
      } continue
   }
   return 'não existe um comando como esse'
}