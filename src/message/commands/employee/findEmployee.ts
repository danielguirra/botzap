import { Command } from 'src/interface/MessageInterface';
import { Buttons } from 'whatsapp-web.js';



export const findEmployee: Command =
   {
   param: 'Procurar Um Empregado',
   alias: ['find'],
   buttons:true,
   description: 'Procurar um por cpf ou nome',
      func:async function findEmployeeButtons(message) {
         message.reply(new Buttons('Selecione o método de procura!🔎',
            [{ body: "Procurar Empregado Por Nome" }, { body: "Procurar Empregado Por CPF" }],
            'Empregados',)).then((v) => {
            }).catch((err) => {
               console.error(err)
            })
      }
   }