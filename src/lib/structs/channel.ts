import { api } from "../client";
import { AsyncCache } from "../cache";
import {
    ChannelPayload,
    ChannelType,
    ForumTagPayload,
    OverwritePayload,
    ThreadMemberPayload,
    ThreadMetadataPayload,
} from "../gateway/payloads/channel";
import { DefaultReactionPayload } from "../gateway/payloads/emoji";
import { Snowflake, wrapSnowflake } from "../gateway/snowflake";
import { Guild, GuildCache } from "./guild";

class ChannelCacheClass extends AsyncCache<Channel> {
    async create(key: string): Promise<Channel> {
        const payload = await api.getChannel(key.toString());

        const channel = new Channel(payload);
        await channel.setup();

        this.set(channel, channel);

        return channel;
    }
}

export const ChannelCache = new ChannelCacheClass();

export class Channel {
    id: Snowflake;
    type: ChannelType;
    guild_id: Snowflake;
    guild?: Guild;
    position?: number;
    permission_overwrites?: OverwritePayload[];
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: Snowflake;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: any[];
    icon?: string;
    owner_id?: Snowflake;
    application_id?: Snowflake;
    parent_id?: Snowflake;
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
    applied_tags?: Snowflake[];
    default_reaction_emoji?: DefaultReactionPayload;
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number;
    default_forum_layout?: number;

    constructor(payload: ChannelPayload) {
        this.id = new Snowflake(payload.id);
        this.type = payload.type;
        this.position = payload.position;
        this.permission_overwrites = payload.permission_overwrites;
        this.name = payload.name;
        this.topic = payload.topic;
        this.nsfw = payload.nsfw;
        this.bitrate = payload.bitrate;
        this.user_limit = payload.user_limit;
        this.rate_limit_per_user = payload.rate_limit_per_user;
        this.recipients = payload.recipients;
        this.icon = payload.icon;
        this.last_pin_timestamp = payload.last_pin_timestamp;
        this.rtc_region = payload.rtc_region;
        this.video_quality_mode = payload.video_quality_mode;
        this.message_count = payload.message_count;
        this.member_count = payload.member_count;
        this.thread_metadata = payload.thread_metadata;
        this.member = payload.member;
        this.default_auto_archive_duration =
            payload.default_auto_archive_duration;
        this.permissions = payload.permissions;
        this.flags = payload.flags;
        this.total_message_sent = payload.total_message_sent;
        this.available_tags = payload.available_tags;
        this.default_reaction_emoji = payload.default_reaction_emoji;
        this.default_thread_rate_limit_per_user =
            payload.default_thread_rate_limit_per_user;
        this.default_sort_order = payload.default_sort_order;
        this.default_forum_layout = payload.default_forum_layout;

        this.guild_id = new Snowflake(payload.guild_id);
        this.last_message_id = wrapSnowflake(payload.last_message_id);
        this.owner_id = wrapSnowflake(payload.owner_id);
        this.application_id = wrapSnowflake(payload.application_id);
        this.parent_id = wrapSnowflake(payload.parent_id);

        if (payload.applied_tags) {
            this.applied_tags = payload.applied_tags.map(
                (tag) => new Snowflake(tag)
            );
        }
    }

    async setup(): Promise<void> {
        this.guild = await GuildCache.get(this.guild_id);
    }
}
