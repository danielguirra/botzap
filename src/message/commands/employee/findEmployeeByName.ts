import * as fs from 'fs';

import { Command } from '../../../interface/MessageInterface';
import { offCollect, onCollect } from '../../messageCreate';




export const findEmployeeByName: Command = {
   param: "Procurar Empregado Por Nome",
   buttons: true,
   func: async function findEmployeeByName(message) {
      const chat = await message.getChat()
      chat.sendMessage('Digite o primeiro nome do funcionario').then(() => {
         const question = questionCache(chat);
      })

   },
   description:'Retorna a busca de empregado baseado no nome digitado'
}



function questionCache(chat) {
   onCollect();
   setTimeout(() => {
      const lastMessage = (fs.readFileSync('./cache/' + chat.id.user + '.txt', 'utf-8'));
      if (lastMessage !== 'Digite o primeiro nome do funcionario') {
         chat.sendMessage('vou procurar por ' + lastMessage);
         requestFindEmployeeByName(lastMessage)
         offCollect()
         return lastMessage
      }
      questionCache(chat)
   }, 7000);
}

async function requestFindEmployeeByName(employeeName: string) {
   console.log(employeeName)
   // const finder = await axios.get(URL_API + '/employee/name/' + employeeName.toLocaleLowerCase())
   // if (finder.data.employees) {
   //    return finder.data
   //    }
   }


let sections = [{
   title: 'sectionTitle',
   rows: [
      {
         title: 'ListItem1',
         description: 'desc'
      },
      {
         title: 'ListItem2'
      }]
}];