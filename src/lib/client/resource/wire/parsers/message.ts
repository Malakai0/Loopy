import { MessagePayload } from "../../payloads/Message";
import { Snowflake } from "../../snowflake";
import { Message } from "../../structs/Message";

async function messageCreate(data: MessagePayload): Promise<Message> {
    const message = new Message(data);
    await message.setup();
    return message;
}

async function messageUpdate(data: MessagePayload): Promise<Message> {
    const message = new Message(data);
    await message.setup();
    return message;
}

async function messageDelete(data: MessagePayload): Promise<Snowflake> {
    return new Snowflake(data.id);
}

async function messageDeleteBulk(data: {
    ids: string[];
}): Promise<Snowflake[]> {
    return data.ids.map((id) => new Snowflake(id));
}

export { messageCreate, messageUpdate, messageDelete, messageDeleteBulk };
