import { SnowflakePayload } from "../snowflake";
import { EmojiPayload, StickerPayload } from "./emoji";
import { UserPayload } from "./user";

enum GuildMemberFlags {
    DidRejoin = 1 << 0,
    CompletedOnboarding = 1 << 1,
    BypassVerification = 1 << 2,
    StartedOnboarding = 1 << 3,
}

enum VerificationLevel {
    None,
    Low,
    Medium,
    High,
    VeryHigh,
}

enum DefaultMessageNotificationLevel {
    AllMessages,
    OnlyMentions,
}

enum ExplicitContentFilterLevel {
    Disabled,
    MembersWithoutRoles,
    AllMembers,
}

enum MFALevel {
    None,
    Elevated,
}

enum NSFWLevel {
    Default,
    Explicit,
    Safe,
    AgeRestricted,
}

enum PremiumTier {
    None,
    Tier1,
    Tier2,
    Tier3,
}

enum SystemChannelFlags {
    SuppressJoinNotifications = 1 << 0,
    SuppressPremiumSubscriptions = 1 << 1,
    SuppressGuildReminderNotifications = 1 << 2,
    SuppressJoinNotificationReplies = 1 << 3,
    SuppressRoleSubscriptionNotifications = 1 << 4,
    SuppressRoleSubscriptionNotificationReplies = 1 << 5,
}

enum GuildFeatures {
    AnimatedBanner = "ANIMATED_BANNER",
    AnimatedIcon = "ANIMATED_ICON",
    ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
    AutoModeration = "AUTO_MODERATION",
    Banner = "BANNER",
    Community = "COMMUNITY",
    CreatorMonetizableProvisional = "CREATOR_MONETIZABLE_PROVISIONAL",
    CreatorStorePage = "CREATOR_STORE_PAGE",
    DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
    Discoverable = "DISCOVERABLE",
    Featurable = "FEATURABLE",
    InvitesDisabled = "INVITES_DISABLED",
    InviteSplash = "INVITE_SPLASH",
    MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
    MoreStickers = "MORE_STICKERS",
    News = "NEWS",
    Partnered = "PARTNERED",
    PreviewEnabled = "PREVIEW_ENABLED",
    RaidAlertsDisabled = "RAID_ALERTS_DISABLED",
    RoleIcons = "ROLE_ICONS",
    RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
    TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
    VanityUrl = "VANITY_URL",
    Verified = "VERIFIED",
    VipRegions = "VIP_REGIONS",
    WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED",
}

type WelcomeScreenChannelPayload = {
    channel_id: SnowflakePayload;
    description: string;
    emoji_id: SnowflakePayload;
    emoji_name: string;
};

type WelcomeScreenPayload = {
    description: string;
    welcome_channels: WelcomeScreenChannelPayload[];
};

enum RoleFlags {
    InPrompt = 1 << 0,
}

// null-represented boolean (null = true, undefined = false)
type RoleTagsPayload = {
    bot_id?: SnowflakePayload;
    integration_id?: SnowflakePayload;
    premium_subscriber?: null | undefined;
    subscription_listing_id?: SnowflakePayload;
    available_for_purchase?: null | undefined;
    guild_connections?: null | undefined;
};

type RolePayload = {
    id: SnowflakePayload;
    name: string;
    color: number;
    hoist: boolean;
    icon: string;
    unicode_emoji: string;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags: RoleTagsPayload;
    flags: number;
};

type GuildMemberPayload = {
    user: UserPayload;
    nick?: string;
    avatar?: string;
    roles: SnowflakePayload[];
    joined_at: string;
    premium_since?: string;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: string;
};

type GuildPayload = {
    id: SnowflakePayload;
    name: string;
    icon: string;
    owner?: boolean;
    owner_id: SnowflakePayload;
    permissions?: string;
    region?: string;
    afk_channel_id: SnowflakePayload;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: SnowflakePayload;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: RolePayload[];
    emojis: EmojiPayload[];
    features: GuildFeatures[];
    mfa_level: MFALevel;
    application_id?: SnowflakePayload;
    system_channel_id?: SnowflakePayload;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id: SnowflakePayload;
    max_presences?: number;
    max_members: number;
    vanity_url_code?: string;
    description: string;
    banner: string;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id?: SnowflakePayload;
    max_video_channel_users: number;
    max_stage_video_channel_users: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen: WelcomeScreenPayload;
    nsfw_level: NSFWLevel;
    stickers: StickerPayload[];
    premium_progress_bar_enabled: boolean;
    safety_alerts_channel_id?: SnowflakePayload;
    unavailable?: boolean;
};

export {
    GuildMemberPayload,
    GuildPayload,
    GuildFeatures,
    RolePayload,
    RoleTagsPayload,
    WelcomeScreenPayload,
    WelcomeScreenChannelPayload,
    GuildMemberFlags,
    VerificationLevel,
    DefaultMessageNotificationLevel,
    ExplicitContentFilterLevel,
    MFALevel,
    SystemChannelFlags,
    NSFWLevel,
    PremiumTier,
    RoleFlags,
};
