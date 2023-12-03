/* 
Command handler, kinda for testing purposes
I'm keeping this separate from the library itself because this is kind of a piece of junk.
*/

import {
    Channel,
    ChannelCache,
    Embed,
    Message,
    User,
    UserCache,
    getRoleFromId,
} from "@lib/structs";
import { RolePayload } from "@lib/gateway";

const userRegex = new RegExp(/<@(\d+)>/);
const roleRegex = new RegExp(/<@&(\d+)>/);
const channelRegex = new RegExp(/<#(\d+)>/);

type ArgumentValue = string | number | User | RolePayload | Channel;
type Argument = {
    type: "string" | "..." | "number" | "user" | "role" | "channel";
    value?: ArgumentValue;
    optional?: boolean;
};

class Command {
    name: string;
    args: Argument[];
    callback: (message: Message, args: ArgumentValue[]) => Promise<void>;

    constructor(
        name: string,
        args: Argument[],
        callback: (message: Message, args: ArgumentValue[]) => Promise<void>
    ) {
        this.name = name;
        this.args = args;
        this.callback = callback;
    }

    async run(message: Message, args: Argument[]) {
        await this.callback(
            message,
            args.map((arg) => arg.value as ArgumentValue)
        );
    }

    async parseArgs(message: Message) {
        const args = message.content.split(" ");
        args.shift();

        for (let i = 0; i < this.args.length; i++) {
            const arg = args[i];

            if (!arg && !this.args[i].optional) {
                throw new Error(
                    `Missing argument ${i + 1} for command ${this.name}`
                );
            }

            if (!arg && this.args[i].optional) {
                continue;
            }

            if (this.args[i].type === "...") {
                this.args[i].value = args.slice(i).join(" ");
                break;
            }

            switch (this.args[i].type) {
                case "string":
                    this.args[i].value = arg;
                    break;
                case "number":
                    this.args[i].value = Number(arg);
                    break;
                case "user":
                    const user = userRegex.exec(arg);
                    if (!user) {
                        throw new Error(
                            `Invalid user provided for argument ${i + 1}`
                        );
                    }
                    this.args[i].value = await UserCache.get(user[1]);
                    break;
                case "role":
                    const role = roleRegex.exec(arg);
                    if (!role) {
                        throw new Error(
                            `Invalid role provided for argument ${i + 1}`
                        );
                    }
                    this.args[i].value = getRoleFromId(message.guild!, role[1]);
                    break;
                case "channel":
                    const channel = channelRegex.exec(arg);
                    if (!channel) {
                        throw new Error(
                            `Invalid channel provided for argument ${i + 1}`
                        );
                    }
                    this.args[i].value = await ChannelCache.get(channel[1]);
                    break;
            }
        }
    }
}

class CommandHandler {
    prefix: string;
    commands: Command[];

    constructor(prefix: string = "!") {
        this.prefix = prefix;
        this.commands = [];
    }

    registerCommand(command: Command) {
        this.commands.push(command);
    }

    registerCommands(commands: Command[]) {
        this.commands.push(...commands);
    }

    async handleException(message: Message, error: Error) {
        const embed = new Embed()
            .set_title("Oops!")
            .set_color(0xff0000)
            .set_description(error.message);

        await message.reply(embed);
    }

    async handle(message: Message) {
        if (!message.content.startsWith(this.prefix)) return;
        const commandName = message.content.split(" ")[0].slice(1);
        const command = this.commands.find((c) => c.name === commandName);

        if (!command) return;

        try {
            await command.parseArgs(message);
        } catch (error: any) {
            await this.handleException(message, error);
            return;
        }

        try {
            await command.run(message, command.args);
        } catch (error: any) {
            await this.handleException(message, error);
        }
    }
}

export { CommandHandler, Command, Argument, ArgumentValue };
