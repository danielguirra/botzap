import { client } from './client/client';
import { message_create } from './message/messageCreate';
import { qr } from './qr';
import { ready } from './ready';


export const on = {
   message_create,
   ready, qr,
   start: client.initialize()
}