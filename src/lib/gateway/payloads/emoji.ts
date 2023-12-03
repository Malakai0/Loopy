import { SnowflakePayload } from "../snowflake";
import { UserPayload } from "./user";

enum StickerType {
    Standard = 1,
    Guild = 2,
}

enum StickerFormatType {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3,
    GIF = 4,
}

type DefaultReactionPayload = {
    emoji_id?: SnowflakePayload;
    emoji_name?: string;
};

type EmojiPayload = {
    id: SnowflakePayload;
    name: string;
    roles: SnowflakePayload[];
    user: UserPayload;
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
};

type StickerPayload = {
    id: SnowflakePayload;
    pack_id: SnowflakePayload;
    name: string;
    description: string;
    tags: string;
    asset: string;
    type: StickerType;
    format_type: StickerFormatType;
    available: boolean;
    guild_id: SnowflakePayload;
    user: UserPayload;
    sort_value: number;
};

export {
    StickerType,
    StickerFormatType,
    EmojiPayload,
    StickerPayload,
    DefaultReactionPayload,
};
