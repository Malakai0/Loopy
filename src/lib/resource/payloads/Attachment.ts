import { SnowflakePayload, Snowflake } from "../snowflake";

enum AttachmentFlags {
    IsRemix = 1 << 2,
}

type AttachmentPayload = {
    id: SnowflakePayload;
    filename: string;
    description: string;
    content_type: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    ephemeral?: boolean;
    duration_secs?: number;
    waveform?: number[];
    flags: number;
};

export { AttachmentFlags, AttachmentPayload };
