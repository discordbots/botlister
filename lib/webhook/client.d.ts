import Express from 'express';
export interface WebhookOptions {
    secret: string;
    port?: number;
}
export declare class WebhookClient {
    port: number;
    secret: string;
    server: Express.Application;
    constructor(options: WebhookOptions);
    listen(): Promise<void>;
}
