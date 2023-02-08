import { Client, LocalAuth } from 'whatsapp-web.js';

export const URL_API= process.env.URL_API
export const client = new Client({
  authStrategy: new LocalAuth(),
});

