import { ApplicationPayload } from "../gateway/payloads/application";
import { TeamPayload } from "../gateway/payloads/team";
import { Guild, GuildCache } from "./guild";
import { User, UserCache } from "./user";

export class Application {
    id: string;
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
    guild_id?: string;
    primary_sku_id?: string;
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
    owner_id?: string;

    constructor(payload: ApplicationPayload) {
        this.id = payload.id;
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
        this.guild_id = payload.guild_id;
        this.primary_sku_id = payload.primary_sku_id;
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

        if (payload.guild) {
            this.guild = new Guild(payload.guild);
        }

        if (payload.owner) {
            this.owner_id = payload.owner.id;
            this.owner = new User(payload.owner);
        }
    }

    async setup(): Promise<void> {
        if (this.guild_id && !this.guild) {
            this.guild = await GuildCache.get(this.guild_id);
        }

        this.bot = await UserCache.get(this.id);
    }
}
