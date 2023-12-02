import { api } from "../../client";
import { Snowflake, wrapSnowflake } from "../snowflake";
import { User } from "./User";
import { Channel, ChannelCache } from "./Channel";
import { Embed } from "./Embed";
import { AttachmentPayload } from "../payloads/Attachment";
import {
    MessageApplicationPayload,
    MessagePayload,
    MessageType,
} from "../payloads/Message";
import { ChannelMentionPayload } from "../payloads/Channel";

export class Message {
    id: Snowflake;
    channel_id: Snowflake;
    author: User;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: User[];
    mention_channels?: Channel[];
    mention_roles: string[];
    attachments: AttachmentPayload[];
    embeds: Embed[];
    nonce: string | number;
    pinned: boolean;
    webhook_id?: Snowflake;
    type: MessageType;
    activity: any;
    application?: MessageApplicationPayload;
    application_id?: Snowflake;
    flags: number;
    referenced_message?: Message;
    interaction: any;
    channel?: Channel;
    private _mention_channels_raw?: ChannelMentionPayload[];

    constructor(payload: MessagePayload) {
        if (!payload.channel_id) {
            throw new Error("Message#constructor: Thread not linked");
        }
        this.id = new Snowflake(payload.id);
        this.channel_id = new Snowflake(payload.channel_id);
        this.author = new User(payload.author);
        this.content = payload.content;
        this.timestamp = payload.timestamp;
        this.edited_timestamp = payload.edited_timestamp;
        this.tts = payload.tts;
        this.mention_everyone = payload.mention_everyone;
        this.mentions = payload.mentions.map((m: any) => new User(m));
        this.mention_channels = [];
        this._mention_channels_raw = payload.mention_channels;
        this.mention_roles = payload.mention_roles;
        this.attachments = payload.attachments;
        this.embeds = payload.embeds.map((e: any) => new Embed(e));
        this.nonce = payload.nonce!;
        this.pinned = payload.pinned;
        this.webhook_id = wrapSnowflake(payload.webhook_id);
        this.type = payload.type;
        this.activity = payload.activity;
        this.flags = payload.flags!;
        this.referenced_message = payload.referenced_message
            ? new Message(payload.referenced_message)
            : undefined;
        this.interaction = payload.interaction;

        if (payload.application_id && payload.application) {
            this.application_id = new Snowflake(payload.application_id);
            this.application = payload.application;
        }
    }

    async setup(): Promise<void> {
        this.channel = await ChannelCache.get(this.channel_id);
        if (this._mention_channels_raw) {
            this.mention_channels = await Promise.all(
                this._mention_channels_raw.map((c) => ChannelCache.get(c.id))
            );
        }
    }

    async reply(content: string | Embed): Promise<MessagePayload> {
        const packet = {
            content: undefined as string | undefined,
            embeds: undefined as Embed[] | undefined,
            message_reference: {
                message_id: this.id.toString(),
                channel_id: this.channel_id.toString(),
                guild_id: this.channel?.guild_id?.toString(),
            },
        };

        if (typeof content === "string") {
            packet.content = content;
        } else {
            packet.embeds = [content];
        }

        return await api.createMessage(this.channel_id.toString(), packet);
    }

    async edit(content: string): Promise<MessagePayload> {
        return await api.editMessage(
            this.channel_id.toString(),
            this.id.toString(),
            {
                content,
            }
        );
    }

    async delete(): Promise<void> {
        return await api.deleteMessage(
            this.channel_id.toString(),
            this.id.toString()
        );
    }
}
