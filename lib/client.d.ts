import { RestClient } from './rest/client';
import { WebhookClient, WebhookOptions } from './webhook/client';
export interface ClientOptions {
    internalLogging?: boolean;
    webhook?: WebhookOptions;
}
export declare class Client {
    logs: boolean;
    rest: RestClient;
    webhook: WebhookClient | null;
    constructor(token: string, options?: ClientOptions);
    log(message: string): void;
}
