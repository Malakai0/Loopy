import { api } from "../../client";
import { AsyncCache } from "../cache";
import { ApplicationPayload } from "../payloads/Application";
import { TeamPayload } from "../payloads/Team";
import { Snowflake, wrapSnowflake } from "../snowflake";
import { Guild, GuildCache } from "./Guild";
import { User, UserCache } from "./User";

class ApplicationCacheClass extends AsyncCache<Application> {
    async create(key: string): Promise<Application> {
        const payload = await api.getChannel(key.toString());
        const app = new Application(payload);
        this.set(key, app);
        return app;
    }
}

export const ApplicationCache = new ApplicationCacheClass();

export class Application {
    id: Snowflake;
    name: string;
    icon: string;
    description: string;
    rpc_origins: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    terms_of_service_url: string;
    privacy_policy_url: string;
    summary: string;
    verify_key: string;
    guild_id?: Snowflake;
    primary_sku_id?: Snowflake;
    slug: string;
    cover_image: string;
    flags: number;
    approximate_guild_count: number;
    redirect_uris: string[];
    interactions_endpoint_url: string;
    role_connections_verification_url: string;
    tags: string[];
    install_params: string;
    custom_install_url: string;
    team?: TeamPayload;
    bot?: User;
    guild?: Guild;
    owner?: User;
    owner_id?: Snowflake;

    constructor(payload: ApplicationPayload) {
        this.id = new Snowflake(payload.id);
        this.name = payload.name;
        this.icon = payload.icon;
        this.description = payload.description;
        this.rpc_origins = payload.rpc_origins;
        this.bot_public = payload.bot_public;
        this.bot_require_code_grant = payload.bot_require_code_grant;
        this.terms_of_service_url = payload.terms_of_service_url;
        this.privacy_policy_url = payload.privacy_policy_url;
        this.summary = payload.summary;
        this.verify_key = payload.verify_key;
        this.guild_id = wrapSnowflake(payload.guild_id);
        this.primary_sku_id = wrapSnowflake(payload.primary_sku_id);
        this.slug = payload.slug;
        this.cover_image = payload.cover_image;
        this.flags = payload.flags;
        this.approximate_guild_count = payload.approximate_guild_count;
        this.redirect_uris = payload.redirect_uris;
        this.interactions_endpoint_url = payload.interactions_endpoint_url;
        this.role_connections_verification_url =
            payload.role_connections_verification_url;
        this.tags = payload.tags;
        this.install_params = payload.install_params;
        this.custom_install_url = payload.custom_install_url;
        this.team = payload.team;

        UserCache.get(this.id).then((user) => {
            this.bot = user;
        });

        if (payload.guild) {
            this.guild = new Guild(payload.guild);
        }

        if (payload.owner) {
            this.owner_id = new Snowflake(payload.owner.id);
            this.owner = new User(payload.owner);
        }

        ApplicationCache.set(this.id, this);
    }

    async setup(): Promise<void> {
        if (this.guild_id && !this.guild) {
            this.guild = await GuildCache.get(this.guild_id);
        }
    }
}
