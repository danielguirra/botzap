import { client } from './client/client';

export const ready = client.on('ready', () => {
   console.log('Client is ready!')
})