import { api } from "../client";
import { AsyncCache } from "../cache";
import { UserPayload } from "../gateway/payloads/user";
import { Snowflake } from "../gateway/snowflake";

class UserCacheClass extends AsyncCache<User> {
    async create(key: string): Promise<User> {
        const payload = await api.getUser(key.toString());
        const user = new User(payload);
        this.set(user, user);
        return user;
    }
}

export const UserCache = new UserCacheClass();

export class User {
    id: Snowflake;
    username: string;
    discriminator: string;
    global_name: string;
    avatar: string;
    bot: boolean;
    system: boolean;
    mfa_enabled: boolean;
    banner: string;
    accent_color: number;
    locale: string;
    verified: boolean;
    email: string;
    flags: number;
    premium_type: number;
    public_flags: number;
    avatar_decoration: string;

    constructor(payload: UserPayload) {
        this.id = new Snowflake(payload.id);
        this.username = payload.username;
        this.discriminator = payload.discriminator;
        this.global_name = payload.global_name;
        this.avatar = payload.avatar;
        this.bot = payload.bot!;
        this.system = payload.system!;
        this.mfa_enabled = payload.mfa_enabled!;
        this.banner = payload.banner!;
        this.accent_color = payload.accent_color!;
        this.locale = payload.locale!;
        this.verified = payload.verified!;
        this.email = payload.email!;
        this.flags = payload.flags!;
        this.premium_type = payload.premium_type!;
        this.public_flags = payload.public_flags!;
        this.avatar_decoration = payload.avatar_decoration!;

        UserCache.set(this.id, this);
    }
}
