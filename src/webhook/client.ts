import { WEBHOOK_PORT, WEBHOOK_SECRET_HEADER_NAME, HttpStatusCodes } from '../constants';

import Express from 'express';
import { Server } from 'http';
import { Client } from '../client';

export interface WebhookOptions {
    secret: string;
    port?: number
}

export class WebhookClient {
    public application: Express.Application = Express();
    public client: Client
    public port: number;
    public secret: string;
    public server?: Server

    constructor (client: Client, options: WebhookOptions) {
      this.client = client;
      this.port = options.port || WEBHOOK_PORT;
      this.secret = options.secret;

      this.application.post('/', this._onPost.bind(this));
    }

    public async listen (): Promise<void> {
      return new Promise((resolve) => {
        this.server = this.application.listen(this.port, resolve);
      });
    }

    public async close (): Promise<void> {
      if (!this.server) throw new Error('Server is not listening');
      return new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) reject(err);
          resolve();
        });
      });
    }

    private _onPost (req: Express.Request, res: Express.Response) {
      const signature = req.headers[WEBHOOK_SECRET_HEADER_NAME];
      if (!signature) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).send();
      }

      const [secret, unix] = Array.isArray(signature) ? signature : signature.split(' ');
      if (secret !== this.secret) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).send();
      }

      this.client.emit('vote', {
        ...req.body,
        votedAt: new Date(parseInt(unix))
      });
    }
}
