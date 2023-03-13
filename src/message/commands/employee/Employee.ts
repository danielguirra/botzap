import { client } from '../../../client/client';
import { Command } from 'src/interface/MessageInterface';
import { Buttons } from 'whatsapp-web.js';

export const commandEmployeeBase: Command = {
   param: "empregados",
   alias: ['fun', 'funcionarios'],
   buttons: true,
   description: 'Abre a função empregados que retorna botões dos comandos de funcionário',
   func: async function returnButtonsEmployees(message) {

      try {
         await client.sendMessage(message.from, new Buttons('Selecione o que deseja fazer!  👀',
            [{ body: "Procurar Um Empregado", id: "findEmploye" }],
            'Empregados',))
      } catch (error) {
         console.log(error.message)
      }

   }
}