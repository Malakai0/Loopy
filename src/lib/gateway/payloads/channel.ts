import { SnowflakePayload } from "../snowflake";
import { DefaultReactionPayload } from "./emoji";
import { GuildMemberPayload } from "./guild";

enum ChannelType {
    GuildText = 0,
    DM = 1,
    GuildVoice = 2,
    GroupDM = 3,
    GuildCategory = 4,
    GuildAnnouncement = 5,
    AnnouncementThread = 10,
    PublicThread = 11,
    PrivateThread = 12,
    GuildStageVoice = 13,
    GuildDirectory = 14,
    GuildForum = 15,
    GuildMedia = 16,
}

enum ChannelFlags {
    Pinned = 1 << 0,
    RequireTags = 1 << 1,
    HideMediaDownloadOptions = 1 << 2,
}

enum ForumSortOrder {
    LatestActivity = 0,
    CreationDate = 1,
}

enum ForumLayout {
    None = 0,
    List = 1,
    Gallery = 2,
}

type OverwritePayload = {
    id: SnowflakePayload;
    type: 0 | 1; // 0 = role, 1 = member
    allow: string;
    deny: string;
};

type ThreadMetadataPayload = {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked: boolean;
    invitable: boolean;
    create_timestamp: string;
};

type ThreadMemberPayload = {
    id: SnowflakePayload;
    user_id: SnowflakePayload;
    join_timestamp: string;
    flags: number;
    member: GuildMemberPayload;
};

type ForumTagPayload = {
    id: SnowflakePayload;
    name: string;
    moderated: boolean;
    emoji_id?: SnowflakePayload;
    emoji_name?: string;
};

type ChannelPayload = {
    id: SnowflakePayload;
    type: ChannelType;
    guild_id: SnowflakePayload;
    position?: number;
    permission_overwrites?: OverwritePayload[];
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: SnowflakePayload;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: any[];
    icon?: string;
    owner_id?: SnowflakePayload;
    application_id?: SnowflakePayload;
    parent_id?: SnowflakePayload;
    last_pin_timestamp?: string;
    rtc_region?: string;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMetadataPayload;
    member?: ThreadMemberPayload;
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_message_sent?: number;
    available_tags?: ForumTagPayload[];
    applied_tags?: SnowflakePayload[];
    default_reaction_emoji?: DefaultReactionPayload;
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number;
    default_forum_layout?: number;
};

type ChannelMentionPayload = {
    id: SnowflakePayload;
    guild_id: SnowflakePayload;
    type: ChannelType;
    name: string;
};

export {
    ChannelType,
    ChannelFlags,
    ForumSortOrder,
    ForumLayout,
    ChannelPayload,
    ChannelMentionPayload,
    OverwritePayload,
    ThreadMetadataPayload,
    ThreadMemberPayload,
    ForumTagPayload,
};
