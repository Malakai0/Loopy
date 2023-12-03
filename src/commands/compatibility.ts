import { ArgumentValue, Command } from "../commandHandler";
import { Message, User } from "@lib/structs";

export const Compatibility = new Command(
    "compatibility",
    [{ type: "user" }],
    async (message: Message, args: ArgumentValue[]) => {
        const compatibility = Math.floor(Math.random() * 100);
        const user = args[0] as User;

        await message.reply(
            `You are ${compatibility}% compatible with ${user.username}!`
        );
    }
);
