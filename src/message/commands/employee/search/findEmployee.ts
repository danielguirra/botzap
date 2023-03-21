import { client } from '../../../../client/client';
import { Command } from 'src/interface/MessageInterface';
import { Buttons } from 'whatsapp-web.js';



export const findEmployee: Command =
{
   param: 'Procurar Empregado',
   alias: 'findEmployeeButton',
   buttons: true,
   description: 'Procurar um por cpf ou nome',
   func: async function findEmployeeButtons(message) {
      await client.sendMessage(message.from, new Buttons('Selecione o método de procura!🔎',
         [{ body: "Procurar Empregado Por Nome", id: "findEmployeeByName" }, { body: "Procurar Empregado Por CPF", id: "findEmployeeByCPF" }],
         'Empregados',))
   }
}