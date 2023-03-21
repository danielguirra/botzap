import { client } from '../../../client/client';
import { Command } from 'src/interface/MessageInterface';
import { Buttons } from 'whatsapp-web.js';

export const commandEmployeeBase: Command = {
   param: "empregados",
   alias: "emplooyeeButton",
   buttons: true,
   description: 'Abre a função empregados que retorna botões dos comandos de funcionário',
   func: async function returnButtonsEmployees(message) {
      try {
         const button = {
            body: 'Selecione o que deseja fazer!  👀',
            buttons: [
               { body: "Procurar Empregado", id: "findEmployeeButton" },
               { body: "Salvar Empregado", id: "createEmployee" },
               { body: "Editar Empregado", id: "editEmployee" },
            ],
            title: 'Empregados'
         }
         const buttonSender = await client.sendMessage(message.from,
            new Buttons(
               button.body,
               button.buttons,
               button.title
            )
         )
         if (buttonSender) return
         throw new Error('error in send button')
      } catch (error) {
         console.log(error.message)
      }

   }
}