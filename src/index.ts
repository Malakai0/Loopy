import { Client, EVT, Intents } from "@lib/client";
import { Ready } from "@lib/gateway";
import { Embed, Guild, Message } from "@lib/structs";

require("dotenv").config();

const client = new Client([
    Intents.GUILDS,
    Intents.GUILD_MEMBERS,
    Intents.GUILD_MESSAGES,
    Intents.MESSAGE_CONTENT,
]);

client.bind(EVT.READY, (data: Ready) => {
    console.log(
        `Logged in as ${data.user.username}#${data.user.discriminator} on v${data.v}!`
    );
});

client.bind(EVT.MESSAGE_CREATE, async (message: Message) => {
    if (message.author.bot) return;

    if (message.content.includes("ping")) {
        const embed = new Embed().set_title("yes").set_description("pong");
        await message.reply(embed);
    }
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
