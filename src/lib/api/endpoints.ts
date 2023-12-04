enum Endpoints {
    GET_CURRENT_APPLICATION = "/applications/@me",
    GET_USER = "/users/{0}",
    CREATE_MESSAGE = "/channels/{0}/messages",
    EDIT_MESSAGE = "/channels/{0}/messages/{1}",
    DELETE_MESSAGE = "/channels/{0}/messages/{1}",
    GET_CHANNEL = "/channels/{0}",
    GET_GUILD = "/guilds/{0}",
    GET_GUILD_CHANNELS = "/guilds/{0}/channels",
    GET_GUILD_EMOJIS = "/guilds/{0}/emojis",
    GET_GUILD_ROLES = "/guilds/{0}/roles",
    GET_GUILD_MEMBER = "/guilds/{0}/members/{1}",
}

export { Endpoints };
