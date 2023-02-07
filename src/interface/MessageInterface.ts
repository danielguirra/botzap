import WAWebJS from "whatsapp-web.js";

export type Command = {
   param: string;
   alias?: string[]
   description: string;
   func: (message: WAWebJS.Message) => Promise<void>
}

