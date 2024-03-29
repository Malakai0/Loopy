import { EVT } from "../constants";
import {
    messageCreate,
    messageUpdate,
    messageDelete,
    messageDeleteBulk,
} from "./parsers/message";
import { guildCreate, guildUpdate, guildDelete } from "./parsers/guild";
import { ready } from "./parsers/ready";
import { Client } from "../client";
import { API } from "../api/api";
import { Socket } from "./socket";

export type ParserContext = {
    client: Client;
    api: API;
    socket: Socket;
};

export const Parsers: {
    [key: string]: (data: any, context: ParserContext) => any;
} = {
    [EVT.MESSAGE_CREATE]: messageCreate,
    [EVT.MESSAGE_UPDATE]: messageUpdate,
    [EVT.MESSAGE_DELETE]: messageDelete,
    [EVT.MESSAGE_DELETE_BULK]: messageDeleteBulk,
    [EVT.GUILD_CREATE]: guildCreate,
    [EVT.GUILD_UPDATE]: guildUpdate,
    [EVT.GUILD_DELETE]: guildDelete,
    [EVT.READY]: ready,
};
