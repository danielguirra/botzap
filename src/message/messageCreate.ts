
import WAWebJS, { Buttons } from 'whatsapp-web.js';
import { client } from '../client/client';
import { messageBuilder } from './builder';


export type messageCollect = {
   id: WAWebJS.ChatId,
   content: string
}


export let status = process.env.status
export let buttonInAtive = process.env.button
export let inCollect: string | undefined | boolean
export const messagesCollectArray: messageCollect[] = []
let wellcomeStatus = true

export const message_create = client.on("message_create", async (message) => {

   try {
      let chat = await message.getChat()

      if (chat.id._serialized !== '5516999677829@c.us') {

         return
      }
      if (inCollect === true) {
         messagesCollectArray.push({
            id: chat.id,
            content: message.body
         })

      }

      if (message.body === 'sair' || message.body === '!sair') {
         status = 'off'
         try {
            const endSession = await client.sendMessage(message.from, 'Sessão encerrada 👋')
            const endMessage = await client.sendMessage(message.from, `Quando precisar só mandar qualquer mensagem`)
            if (endMessage && endSession) console.log('Sessão encerrada', message.from, new Date().toISOString())
            return setTimeout(() => {
               wellcomeStatus = true
            }, 6000);
         } catch (error) {
            console.log(message.type)
            console.log(error.message)
         }
      }
      if (wellcomeStatus) {
         message.reply(new Buttons('Selecione um botão',
            [{ body: "Empregados", id: "emplooyeeButton" }],
            'Oi como posso ajudar ?',))

         wellcomeStatus = false
      }


      let param = message.body
      if (param.startsWith('!')) {
         param = param.replace('!', '')
         const finder = findParam(param)
         if (finder === 'não existe um comando como esse') {
            return await message.reply(finder)
         }
         await finder(message)
         timeoutEnd(message);
      }
      if (message.selectedButtonId) param = param.toLowerCase()


      if (!wellcomeStatus) {
         if (message.selectedButtonId) {
            if (message.id.fromMe) return
            const finder = findParam(message.selectedButtonId, true)
            if (finder === 'não existe um comando como esse') {
               return
            }
            await finder(message)
            timeoutEnd(message);
            buttonInAtive = 'false'
         }
      }
      return

   } catch (error) {
      console.error(error.message)
      process.exit(1)
   }

});


function timeoutEnd(message) {
   setTimeout(() => {
      status = 'off';
      client.sendMessage(message.to, 'Sessão encerrada');
   }, 60000 * 5);
}

function findParam(param: string, button?: boolean) {

   if (button) {
      for (let index = 0; index < messageBuilder.length; index++) {
         const command = messageBuilder[index];
         if (param === command.alias) {
            return command.func
         }
      }
      return 'não existe um comando como esse'
   }

   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (element.param === param) {
         return element.func
      }
   }
   return 'não existe um comando como esse'
}


export function onCollect() {
   inCollect = true
}

export function offCollect() {
   inCollect = false
}