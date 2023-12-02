import { ApplicationPayload } from "../../payloads/Application";
import { GuildPayload } from "../../payloads/Guild";
import { UserPayload } from "../../payloads/User";
import { Application } from "../../structs/Application";
import { Guild, GuildCache } from "../../structs/Guild";
import { User } from "../../structs/User";

type ReadyPayload = {
    v: number;
    user: UserPayload;
    guilds: GuildPayload[];
    session_id: string;
    resume_gateway_url: string;
    shard: [number, number];
    application: ApplicationPayload;
};

class Ready {
    v: number;
    user: User;
    guilds: Guild[];
    session_id: string;
    resume_gateway_url: string;
    shard: [number, number];
    application: Application;
    private payload: ReadyPayload;

    constructor(payload: ReadyPayload) {
        this.payload = payload;

        this.v = payload.v;
        this.user = new User(payload.user);
        this.session_id = payload.session_id;
        this.resume_gateway_url = payload.resume_gateway_url;
        this.shard = payload.shard;
        this.application = new Application(payload.application);

        this.guilds = [];
    }

    async setup(): Promise<void> {
        await this.application.setup();

        for (const guildPayload of this.payload.guilds) {
            const guild = await GuildCache.get(guildPayload.id);
            this.guilds.push(guild);
        }
    }
}

async function ready(payload: ReadyPayload): Promise<Ready> {
    const ready = new Ready(payload);
    await ready.setup();

    return ready;
}

export { ready, Ready };
