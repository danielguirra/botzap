import WAWebJS from 'whatsapp-web.js';

export type Command = {
   param: string;
   alias?: string[]
   description: string;
   buttons:boolean
   func: (message: WAWebJS.Message) => Promise<void>
}

