import * as qrcode from 'qrcode-terminal';

import { client } from './client/client';

export const qr = client.on("qr", (qr) => {
   qrcode.generate(qr, { small: true });
});