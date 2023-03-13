
import WAWebJS, { Buttons } from 'whatsapp-web.js';
import { client } from '../client/client';
import { messageBuilder } from './builder';

export let status = process.env.status
export let buttonInAtive = process.env.button
export let inCollect: string | undefined | boolean
export const messagesCollectArray: {
   id: WAWebJS.ChatId
   , content: string
}[] = []
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
            console.log(message)
            console.log(error.message)
         }
      }
      if (wellcomeStatus) {
         message.reply(new Buttons('Selecione um botão',
            [{ body: "Empregados", id: "emplooyeeButton" }],
            'Oi como posso ajudar ?',))

         wellcomeStatus = false
      }


      if (!wellcomeStatus) {
         if (message.body.startsWith('!')) {
            let msg = message.body.replace('!', '')
            const finder = findParam(msg)
            if (finder === 'não existe um comando como esse') {
               return await message.reply(finder)
            }
            if ('buttons' in finder) {
               buttonInAtive = 'true'
               return await finder.func(message)
            }

            await finder(message)
            timeoutEnd(message);
         } if (buttonInAtive === 'true') {
            if (message.id.fromMe) return
            const finder = findParam(message.body)

            if (finder === 'não existe um comando como esse') {
               return
            }
            if ('buttons' in finder) {
               return await finder.func(message)
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

function findParam(param) {
   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (element.param === param) {
         if (element.buttons) {
            return element

         } return element.func
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


export function onCollect() {
   inCollect = true
}

export function offCollect() {
   inCollect = false
}