import { WebhookBody } from './webhook/types';

export interface Vote extends WebhookBody {
    votedAt: Date
}
