enum EmbedType {
    Rich = "rich",
    Image = "image",
    Video = "video",
    Gifv = "gifv",
    Article = "article",
    Link = "link",
}

type EmbedFooterPayload = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

type EmbedImagePayload = {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedThumbnailPayload = {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedVideoPayload = {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

type EmbedProviderPayload = {
    name?: string;
    url?: string;
};

type EmbedAuthorPayload = {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

type EmbedFieldPayload = {
    name: string;
    value: string;
    inline?: boolean;
};

type EmbedPayload = {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooterPayload;
    image?: EmbedImagePayload;
    thumbnail?: EmbedThumbnailPayload;
    video?: EmbedVideoPayload;
    provider?: EmbedProviderPayload;
    author?: EmbedAuthorPayload;
    fields?: EmbedFieldPayload[];
};

export {
    EmbedType,
    EmbedFooterPayload,
    EmbedImagePayload,
    EmbedThumbnailPayload,
    EmbedVideoPayload,
    EmbedProviderPayload,
    EmbedAuthorPayload,
    EmbedFieldPayload,
    EmbedPayload,
};
