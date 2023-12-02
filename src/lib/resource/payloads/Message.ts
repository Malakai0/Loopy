import { SnowflakePayload } from "../snowflake";
import { AttachmentPayload } from "./Attachment";
import { ChannelMentionPayload, ChannelPayload } from "./Channel";
import { EmbedPayload } from "./Embed";
import { EmojiPayload, StickerFormatType, StickerPayload } from "./Emoji";
import { GuildMemberPayload, RolePayload } from "./Guild";
import { UserPayload } from "./User";

enum MessageType {
    Default = 0,
    RecipientAdd = 1,
    RecipientRemove = 2,
    Call = 3,
    ChannelNameChange = 4,
    ChannelIconChange = 5,
    ChannelPinnedMessage = 6,
    UserJoin = 7,
    GuildBoost = 8,
    GuildBoostTier1 = 9,
    GuildBoostTier2 = 10,
    GuildBoostTier3 = 11,
    ChannelFollowAdd = 12,
    GuildDiscoveryDisqualified = 14,
    GuildDiscoveryRequalified = 15,
    GuildDiscoveryGracePeriodInitialWarning = 16,
    GuildDiscoveryGracePeriodFinalWarning = 17,
    ThreadCreated = 18,
    Reply = 19,
    ChatInputCommand = 20,
    ThreadStarterMessage = 21,
    GuildInviteReminder = 22,
    ContextMenuCommand = 23,
    AutoModerationAction = 24,
    RoleSubscriptionPurchase = 25,
    InteractionPremiumUpsell = 26,
    StageStart = 27,
    StageEnd = 28,
    StageSpeaker = 29,
    StageTopic = 31,
    GuildApplicationPremiumSubscription = 32,
}

enum MessageFlags {
    Crossposted = 1 << 0,
    IsCrosspost = 1 << 1,
    SuppressEmbeds = 1 << 2,
    SourceMessageDeleted = 1 << 3,
    Urgent = 1 << 4,
    HasThread = 1 << 5,
    Ephemeral = 1 << 6,
    Loading = 1 << 7,
    FailedToMentionSomeRolesInThread = 1 << 8,
    SuppressNotifications = 1 << 9,
    IsVoiceMessage = 1 << 10,
}

enum MessageInteractionType {
    Ping = 1,
    ApplicationCommand = 2,
    MessageComponent = 3,
    ApplicationCommandAutocomplete = 4,
    ModalSubmit = 5,
}

enum MessageActivityType {
    Join = 1,
    Spectate = 2,
    Listen = 3,
    JoinRequest = 5,
}

type MessageActivityPayload = {
    type: MessageActivityType;
    party_id?: string;
};

type MessageApplicationPayload = {
    id: SnowflakePayload;
    cover_image?: string;
    description: string;
    icon: string;
    name: string;
};

type MessageReferencePayload = {
    message_id?: SnowflakePayload;
    channel_id: SnowflakePayload;
    guild_id?: SnowflakePayload;
    fail_if_not_exists?: boolean;
};

type MessageInteractionPayload = {
    id: SnowflakePayload;
    type: MessageInteractionType;
    name: string;
    user: UserPayload;
};

type MessageStickerPayload = {
    id: SnowflakePayload;
    pack_id: SnowflakePayload;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    preview_asset?: string;
    format_type: StickerFormatType;
};

type RoleSubscriptionDataPayload = {
    role_subscription_listing_id: SnowflakePayload;
    tier_name: string;
    total_months_subscribed: number;
    is_renewal: boolean;
};

type ReactionCountDetailsPayload = {
    burst: number;
    normal: number;
};

type ReactionPayload = {
    count: number;
    count_details: ReactionCountDetailsPayload;
    me: boolean;
    me_burst: boolean;
    emoji: EmojiPayload;
    burst_colors: number[];
};

type ResolvedDataPayload = {
    users?: Record<SnowflakePayload, UserPayload>;
    members?: Record<SnowflakePayload, GuildMemberPayload>;
    roles?: Record<SnowflakePayload, RolePayload>;
    channels?: Record<SnowflakePayload, ChannelPayload>;
    messages?: Record<SnowflakePayload, MessagePayload>;
    attachments?: Record<SnowflakePayload, AttachmentPayload>;
};

type MessagePayload = {
    id: SnowflakePayload;
    channel_id: SnowflakePayload;
    author: UserPayload;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: UserPayload[];
    mention_roles: SnowflakePayload[];
    mention_channels?: ChannelMentionPayload[];
    attachments: AttachmentPayload[];
    embeds: EmbedPayload[];
    reactions?: ReactionPayload[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: SnowflakePayload;
    type: MessageType;
    activity?: MessageActivityPayload;
    application?: MessageApplicationPayload;
    application_id?: SnowflakePayload;
    message_reference?: MessageReferencePayload;
    flags?: number;
    referenced_message?: MessagePayload;
    interaction?: MessageInteractionPayload;
    thread?: ChannelPayload;
    sticker_items?: MessageStickerPayload[];
    stickers?: StickerPayload[];
    position?: number;
    role_subscription_data?: RoleSubscriptionDataPayload;
    resolved?: ResolvedDataPayload;
};

export {
    MessagePayload,
    MessageActivityPayload,
    MessageApplicationPayload,
    MessageInteractionPayload,
    MessageReferencePayload,
    MessageStickerPayload,
    MessageInteractionType,
    MessageActivityType,
    MessageType,
    MessageFlags,
    ReactionPayload,
    ReactionCountDetailsPayload,
    ResolvedDataPayload,
    RoleSubscriptionDataPayload,
};
