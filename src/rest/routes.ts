export const BASE_URL = 'https://discordbotlist.com/api';
export const API_VERSION = 'v1';

export const EndpointParamNames = Object.freeze({
  Stats: Object.freeze({
    ID: ':id'
  })
});

export const Endpoints = Object.freeze({
  STATS: `/bots/${EndpointParamNames.Stats.ID}/stats`
});

export namespace RequestBodies {
    export interface Stats {
        guilds: number;
        shard_id?: number;
        users?: number;
        voice_connections?: number
    }
}
