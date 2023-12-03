require("dotenv").config();
require("module-alias/register");

import { Client, EVT, Intents } from "@lib/client";
import { Ready } from "@lib/gateway";
import { Guild, Message } from "@lib/structs";
import { CommandHandler } from "./commandHandler";
import { Commands } from "./commands/index";

const client = new Client([
    Intents.GUILDS,
    Intents.GUILD_MEMBERS,
    Intents.GUILD_MESSAGES,
    Intents.MESSAGE_CONTENT,
]);

const commandHandler = new CommandHandler();
commandHandler.registerCommands(Commands);

client.bind(EVT.READY, (data: Ready) => {
    console.log(
        `Logged in as ${data.user.username}#${data.user.discriminator} on v${data.v}!`
    );
});

client.bind(EVT.MESSAGE_CREATE, async (message: Message) => {
    if (message.author.bot) return;

    await commandHandler.handle(message);
});

client.bind(EVT.GUILD_CREATE, async (guild: Guild) => {
    console.log(`Joined ${guild.name}!`);
});

client.login(
    process.env.TOKEN ??
        (() => {
            throw new Error("No token provided!");
        })()
);
