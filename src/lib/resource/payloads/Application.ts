import { SnowflakePayload } from "../snowflake";
import { GuildPayload } from "./Guild";
import { TeamPayload } from "./Team";
import { UserPayload } from "./User";

enum ApplicationFlags {
    ApplicationAutoModerationRuleCreateBadge = 1 << 6,
    GatewayPresence = 1 << 12,
    GatewayPresenceLimited = 1 << 13,
    GatewayGuildMembers = 1 << 14,
    GatewayGuildMembersLimited = 1 << 15,
    VerificationPendingGuildLimit = 1 << 16,
    Embedded = 1 << 17,
    GatewayMessageContent = 1 << 18,
    GatewayMessageContentLimited = 1 << 19,
    ApplicationCommandBadge = 1 << 23,
}

type ApplicationPayload = {
    id: SnowflakePayload;
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
    guild_id?: SnowflakePayload;
    primary_sku_id?: SnowflakePayload;
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
    bot?: UserPayload;
    guild?: GuildPayload;
    owner?: UserPayload;
};

export { ApplicationFlags, ApplicationPayload };
