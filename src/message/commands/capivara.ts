
import { Command } from "src/interface/MessageInterface"
import WAWebJS, { MessageMedia } from "whatsapp-web.js"

export const capivaraCommand: Command = {
   description: "retorna uma capivara",
   param: '*capivara',
   func: async function sendCapivara(message: WAWebJS.Message) {
      let imageUrl = 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/cb208be7dd3f15c6831d98c1a36b441c.jpg'
      message.reply(await MessageMedia.fromUrl(
         imageUrl)).
         then(() => { }).
         catch((err) => {
            console.error(err)
         })
   }
}
