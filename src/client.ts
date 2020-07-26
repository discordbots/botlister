import { address } from 'ip';

import { RestClient } from './rest/client';
import { WebhookClient, WebhookOptions } from './webhook/client';
import { EventEmitter } from 'events';
import * as ClientEvents from './events';

export interface ClientOptions {
    internalLogging?: boolean;
    webhook?: WebhookOptions
}

export interface Client {
    on(event: 'vote', listener: (data: ClientEvents.Vote) => void): this;
    on(event: string, listener: Function): this;
}

export class Client extends EventEmitter {
    public logs: boolean
    public rest: RestClient
    public webhook: WebhookClient | null = null

    constructor (token: string, options: ClientOptions = {}) {
      super();
      this.logs = options.internalLogging ?? true;
      this.rest = new RestClient(this, token);
      if (options.webhook) {
        this.webhook = new WebhookClient(this, options.webhook);
        this.webhook.listen().then(() => {
          if (this.logs) {
            this.log(`Listening via webhook URL: http://${address()}:${this.webhook?.port}`);
          }
        });
      }
    }

    public log (message: string) {
      console.log(`[BOTLISTER] ${message}`);
    }
}
