import { Client } from '../client';

export interface RestClientOptions {

}

export class RestClient {
    public client: Client
    public token: string;

    constructor (client: Client, token: string, options: RestClientOptions = {}) {
      this.client = client;
      this.token = token;
    }
}
