export declare const BASE_URL = "https://discordbotlist.com/api";
export declare const API_VERSION = "v1";
export declare const EndpointParamNames: Readonly<{
    Stats: Readonly<{
        ID: string;
    }>;
}>;
export declare const Endpoints: Readonly<{
    STATS: string;
}>;
export declare namespace RequestBodies {
    interface Stats {
        guilds: number;
        shard_id?: number;
        users?: number;
        voice_connections?: number;
    }
}
