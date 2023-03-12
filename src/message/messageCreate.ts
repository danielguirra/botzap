import * as fs from 'fs';

import { client } from '../client/client';
import { messageBuilder } from './builder';

export let status = process.env.status
export let buttonInAtive = process.env.button
export let inCollect:string|undefined|boolean
let wellcomeStatus = false

export const message_create = client.on("message_create", async (message) => {

   try {
      let chat = await message.getChat()
      if (chat.name !== 'Eu') {
         return
      }
      if (inCollect === true) {
         
         fs.writeFileSync(`./cache/${chat.id.user}.txt`,(message.body))
      }
      

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
         else if ('buttons' in finder) {
            finder.func(message)
            buttonInAtive='true'
         } else {
            finder(message)
         }
         setTimeout(() => {
            status = 'off'
            client.sendMessage(message.to, 'Sessão encerrada')
         }, 60000 * 5);
      } else if(buttonInAtive==='true'){
         const finder = findParam(message.body)
         if (finder === 'não existe um comando como esse') return
         else if ('buttons' in finder) {
            finder.func(message)
            buttonInAtive = 'true'
         } else {
            finder(message)
         }
         setTimeout(() => {
            status = 'off'
            client.sendMessage(message.to, 'Sessão encerrada')
         }, 60000 * 5);
      }return



   } catch (error) {
      console.log(error)
   }

});


function findParam(param) {
   for (let index = 0; index < messageBuilder.length; index++) {
      const element = messageBuilder[index];
      if (element.param === param) {
         if (element.buttons) {
            return {
               func: element.func,
               buttons:true
            }
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
   inCollect=true
}

export function offCollect() {
   inCollect = false
}