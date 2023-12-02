import {
    EmbedAuthorPayload,
    EmbedFieldPayload,
    EmbedFooterPayload,
    EmbedImagePayload,
    EmbedPayload,
    EmbedProviderPayload,
    EmbedType,
    EmbedVideoPayload,
} from "../payloads/Embed";

class Embed {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooterPayload;
    image?: EmbedImagePayload;
    thumbnail?: EmbedImagePayload;
    video?: EmbedVideoPayload;
    provider?: EmbedProviderPayload;
    author?: EmbedAuthorPayload;
    fields?: EmbedFieldPayload[];

    constructor(payload: EmbedPayload = {}) {
        this.title = payload.title;
        this.type = payload.type;
        this.description = payload.description;
        this.url = payload.url;
        this.timestamp = payload.timestamp;
        this.color = payload.color!;
        this.footer = payload.footer!;
        this.image = payload.image!;
        this.thumbnail = payload.thumbnail!;
        this.video = payload.video!;
        this.provider = payload.provider!;
        this.author = payload.author!;
        this.fields = payload.fields!;
    }

    set_title(title: string): Embed {
        this.title = title;
        return this;
    }

    set_type(type: EmbedType): Embed {
        this.type = type;
        return this;
    }

    set_description(description: string): Embed {
        this.description = description;
        return this;
    }

    set_url(url: string): Embed {
        this.url = url;
        return this;
    }

    set_timestamp(timestamp: string): Embed {
        this.timestamp = timestamp;
        return this;
    }

    set_color(color: number): Embed {
        this.color = color;
        return this;
    }

    set_footer(footer: EmbedFooterPayload): Embed {
        this.footer = footer;
        return this;
    }

    set_image(image: EmbedImagePayload): Embed {
        this.image = image;
        return this;
    }

    set_thumbnail(thumbnail: EmbedImagePayload): Embed {
        this.thumbnail = thumbnail;
        return this;
    }

    set_video(video: EmbedVideoPayload): Embed {
        this.video = video;
        return this;
    }

    set_provider(provider: EmbedProviderPayload): Embed {
        this.provider = provider;
        return this;
    }

    set_author(author: EmbedAuthorPayload): Embed {
        this.author = author;
        return this;
    }

    set_fields(fields: EmbedFieldPayload[]): Embed {
        this.fields = fields;
        return this;
    }

    toJSON(): EmbedPayload {
        return {
            title: this.title,
            type: this.type,
            description: this.description,
            url: this.url,
            timestamp: this.timestamp,
            color: this.color,
            footer: this.footer,
            image: this.image,
            thumbnail: this.thumbnail,
            video: this.video,
            provider: this.provider,
            fields: this.fields,
        };
    }
}

export { Embed };
