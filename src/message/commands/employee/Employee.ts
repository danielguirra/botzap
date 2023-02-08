import { Command } from 'src/interface/MessageInterface';
import { Buttons } from 'whatsapp-web.js';

export const commandEmployeeBase: Command = {
   param: "empregados",
   alias: ['fun', 'funcionarios'],
   buttons:true,
   description: 'Abre a função empregados que retorna botões dos comandos de funcionário',
   func: async function returnButtonsToEmployee(message) {
      message.reply(new Buttons('Selecione o que deseja fazer!  👀',
         [{ body: "Procurar Um Empregado", id: "findEmploye" }],
         'Empregados',)).then((v) => {
         }).catch((err) => {
            console.error(err)
         })
   }
}