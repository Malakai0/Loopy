import { GuildPayload } from "../../payloads/Guild";
import { Guild, GuildCache } from "../../structs/Guild";

async function guildCreate(payload: GuildPayload): Promise<Guild> {
    if (payload.unavailable) {
        return await GuildCache.get(payload.id);
    }

    const guild = new Guild(payload);
    await guild.setup();

    return guild;
}

async function guildUpdate(payload: GuildPayload): Promise<Guild> {
    const guild = new Guild(payload);
    await guild.setup();

    return guild;
}

async function guildDelete(payload: GuildPayload): Promise<string> {
    GuildCache.delete(payload.id);
    return payload.id;
}

export { guildCreate, guildUpdate, guildDelete };
