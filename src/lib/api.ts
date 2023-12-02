import { Endpoints } from "./client/resource/wire/endpoint";

const BASE_URL: string = "https://discord.com/api/v10";

const format = (str: string, ...args: string[]): string =>
    str.replace(/{(\d+)}/g, (_, index) => args[index] || "");

export class API {
    private auth: string | undefined;

    public login(auth: string): void {
        this.auth = `Bot ${auth}`;
    }

    public async request(endpoint: string, body?: any): Promise<any> {
        if (!this.auth) {
            throw new Error("Not authenticated.");
        }

        const url: string = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: this.auth,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status !== 200) {
            throw new Error("Failed to fetch.");
        }

        return response.json();
    }

    public async post(endpoint: string, body: any): Promise<any> {
        if (!this.auth) {
            throw new Error("Not authenticated.");
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                Authorization: this.auth,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status !== 200) {
            console.error(body);
            console.error(response);
            throw new Error("Failed to fetch.");
        }

        return response.json();
    }

    public async createMessage(channelId: string, body: any): Promise<any> {
        const endpoint: string = format(Endpoints.CREATE_MESSAGE, channelId);
        return await this.post(endpoint, body);
    }

    public async editMessage(
        channelId: string,
        messageId: string,
        body: any
    ): Promise<any> {
        const endpoint: string = format(
            Endpoints.EDIT_MESSAGE,
            channelId,
            messageId
        );
        return await this.post(endpoint, body);
    }

    public async deleteMessage(
        channelId: string,
        messageId: string
    ): Promise<any> {
        const endpoint: string = format(
            Endpoints.DELETE_MESSAGE,
            channelId,
            messageId
        );
        return await this.request(endpoint);
    }

    public async getChannel(channelId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_CHANNEL, channelId);
        return await this.request(endpoint);
    }

    public async getGuild(guildId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_GUILD, guildId);
        return await this.request(endpoint);
    }

    public async getGuildChannels(guildId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_GUILD_CHANNELS, guildId);
        return await this.request(endpoint);
    }

    public async getGuildEmojis(guildId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_GUILD_EMOJIS, guildId);
        return await this.request(endpoint);
    }

    public async getGuildRoles(guildId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_GUILD_ROLES, guildId);
        return await this.request(endpoint);
    }

    public async getGuildMember(guildId: string, userId: string): Promise<any> {
        const endpoint: string = format(
            Endpoints.GET_GUILD_MEMBER,
            guildId,
            userId
        );
        return await this.request(endpoint);
    }

    public async getUser(userId: string): Promise<any> {
        const endpoint: string = format(Endpoints.GET_USER, userId);
        return await this.request(endpoint);
    }
}
