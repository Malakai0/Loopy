import { EventEmitter } from "ws";
import { Socket } from "./gateway/socket";
import { EVT, OpCode } from "./constants";
import { API } from "./api/api";
import { Parsers } from "./gateway/parser";

const GATEWAY: string = "wss://gateway.discord.gg/?v=10&encoding=json";

export const api = new API();

export class Client {
    private socket: Socket;
    private intents: number;
    private sequence: number | undefined;
    private auth?: string;
    private onDispatch: EventEmitter;

    constructor(intents: number[]) {
        this.socket = new Socket(GATEWAY);
        this.intents = intents.reduce((acc, cur) => acc | cur, 0);
        this.sequence = undefined;
        this.onDispatch = new EventEmitter();

        this.socket.listen(OpCode.Hello, (payload: any) => {
            console.log("Received HELLO");
            this.identify();
            this.heartbeatInterval(payload.d.heartbeat_interval);
        });

        this.socket.listen(OpCode.Dispatch, (payload: any) => {
            this.sequence = payload.s;
            this.dispatch(payload.t, payload.d);
        });

        this.socket.listen(OpCode.Heartbeat, () => {
            this.heartbeat();
        });

        this.socket.listen(OpCode.Reconnect, () => {
            this.resume();
        });
    }

    public login(auth: string): void {
        this.auth = auth;
        api.login(auth);
        this.socket.connect();
    }

    public bind<T>(evt: EVT, callback: (data: T) => void): void {
        const parser = Parsers[evt];

        if (!parser) {
            console.error(`No parser for event ${evt}`);
            return;
        }

        this.onDispatch.on(evt, async (data: any) => {
            callback(await parser(data));
        });
    }

    private heartbeat(): void {
        console.log("Sending HEARTBEAT");
        this.socket.send({
            op: OpCode.Heartbeat,
            d: this.sequence,
        });
    }

    private identify(): void {
        console.log("Sending IDENTIFY");
        this.socket.send({
            op: OpCode.Identify,
            d: {
                token: this.auth,
                intents: this.intents,
                properties: {
                    os: "linux",
                    browser: "loopy",
                    device: "loopy",
                },
            },
        });
    }

    private dispatch(evt: EVT, data: any): void {
        this.onDispatch.emit(evt, data);
    }

    private resume(): void {
        console.log("Sending RESUME");
        this.socket.send({
            op: OpCode.Resume,
            d: null,
        });
    }

    private heartbeatInterval(interval: number): void {
        setInterval(() => {
            this.heartbeat();
        }, interval);
    }
}
