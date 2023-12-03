import { ApplicationPayload } from "../payloads/application";
import { GuildPayload } from "../payloads/guild";
import { UserPayload } from "../payloads/user";
import { Application } from "../../structs/application";
import { Guild, GuildCache } from "../../structs/guild";
import { User } from "../../structs/user";

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

        await Promise.all(
            this.payload.guilds.map(async (guildPayload: GuildPayload) =>
                this.guilds.push(await GuildCache.get(guildPayload.id))
            )
        ); // run all guilds in "parallel" (sorta, not really) and wait for them to finish
    }
}

async function ready(payload: ReadyPayload): Promise<Ready> {
    const ready = new Ready(payload);
    await ready.setup();

    return ready;
}

export { ready, Ready };
