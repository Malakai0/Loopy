import { Client } from "./lib/client";
import { Intents } from "./lib/resource/intents";
import { Embed } from "./lib/resource/structs/Embed";
import { Guild } from "./lib/resource/structs/Guild";
import { Message } from "./lib/resource/structs/Message";
import { EVT } from "./lib/resource/wire/constants";
import { Ready } from "./lib/resource/wire/parsers/ready";

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
        const embed = new Embed()
            .set_title("Pong!")
            .set_description("This is an embed!");

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
