import { api } from "../client";
import { AsyncCache } from "../cache";
import { EmojiPayload, StickerPayload } from "../gateway/payloads/emoji";
import {
    ExplicitContentFilterLevel,
    GuildFeatures,
    GuildPayload,
    MFALevel,
    NSFWLevel,
    PremiumTier,
    RolePayload,
    VerificationLevel,
} from "../gateway/payloads/guild";

class GuildCacheClass extends AsyncCache<Guild> {
    async create(key: string): Promise<Guild> {
        const payload = await api.getGuild(key.toString());

        const guild = new Guild(payload);
        await guild.setup();

        this.set(guild, guild);

        return guild;
    }
}

export const GuildCache = new GuildCacheClass();

export class Guild {
    id: string;
    name: string;
    icon: string;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string;
    verification_level: VerificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: RolePayload[];
    emojis: EmojiPayload[];
    features: GuildFeatures[];
    mfa_level: MFALevel;
    application_id?: string;
    max_presences?: number;
    max_members: number;
    vanity_url_code: string;
    description: string;
    banner: string;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale: string;
    nsfw_level: NSFWLevel;
    stickers: StickerPayload[];

    constructor(payload: GuildPayload) {
        this.id = payload.id;
        this.name = payload.name;
        this.icon = payload.icon;
        this.owner = payload.owner;
        this.owner_id = payload.owner_id;
        this.permissions = payload.permissions;
        this.region = payload.region;
        this.verification_level = payload.verification_level;
        this.explicit_content_filter = payload.explicit_content_filter;
        this.roles = payload.roles;
        this.emojis = payload.emojis;
        this.features = payload.features;
        this.mfa_level = payload.mfa_level;
        this.application_id = payload.application_id;
        this.max_presences = payload.max_presences;
        this.max_members = payload.max_members;
        this.vanity_url_code = payload.vanity_url_code!;
        this.description = payload.description;
        this.banner = payload.banner;
        this.premium_tier = payload.premium_tier;
        this.premium_subscription_count = payload.premium_subscription_count;
        this.preferred_locale = payload.preferred_locale;
        this.nsfw_level = payload.nsfw_level;
        this.stickers = payload.stickers;

        GuildCache.set(this.id, this);
    }

    async setup(): Promise<void> {}
}

export function getRoleFromId(
    guild: Guild,
    id: string
): RolePayload {
    return guild.roles.find((role) => role.id === id.toString())!;
}
