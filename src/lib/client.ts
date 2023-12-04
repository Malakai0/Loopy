import { EventEmitter } from "ws";
import { Socket } from "./gateway/socket";
import { EVT, OpCode } from "./constants";
import { API } from "./api/api";
import { Parsers } from "./gateway/parser";
import { Application } from "./structs";

const GATEWAY: string = "wss://gateway.discord.gg/?v=10&encoding=json";

export const api = new API();
export const socket = new Socket(GATEWAY);

export class Client {
    private intents: number;
    private sequence: number | undefined;
    private auth?: string;
    private onDispatch: EventEmitter;
    private session_id?: string;

    app?: Application;

    constructor(intents: number[]) {
        this.intents = intents.reduce((acc, cur) => acc | cur, 0);
        this.sequence = undefined;
        this.onDispatch = new EventEmitter();

        socket.listen(OpCode.Hello, (payload: any) => {
            console.log("Received HELLO");
            this.identify();
            this.heartbeatInterval(payload.d.heartbeat_interval);
        });

        socket.listen(OpCode.Dispatch, (payload: any) => {
            this.sequence = payload.s;
            this.dispatch(payload.t, payload.d);
        });

        socket.listen(OpCode.Heartbeat, () => {
            this.heartbeat();
        });

        socket.listen(OpCode.Reconnect, () => {
            this.resume();
        });
    }

    public set_session_id(session_id: string): void {
        this.session_id = session_id;
    }

    public set_application(app: Application): void {
        this.app = app;
    }

    public login(auth: string): void {
        this.auth = auth;
        api.login(auth);
        socket.connect();
    }

    public bind<T>(evt: EVT, callback: (data: T) => void): void {
        const parser = Parsers[evt];

        if (!parser) {
            console.error(`No parser for event ${evt}`);
            return;
        }

        const parserContext = {
            api,
            socket,
            client: this,
        };

        this.onDispatch.on(evt, async (data: any) => {
            callback(await parser(data, parserContext));
        });
    }

    private heartbeat(): void {
        console.log("Sending HEARTBEAT");
        socket.send({
            op: OpCode.Heartbeat,
            d: this.sequence,
        });
    }

    private identify(): void {
        console.log("Sending IDENTIFY");
        socket.send({
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
        socket.connect();
        socket.send({
            op: OpCode.Resume,
            d: {
                token: this.auth,
                session_id: this.session_id,
                seq: this.sequence,
            },
        });
    }

    private heartbeatInterval(interval: number): void {
        setInterval(() => {
            this.heartbeat();
        }, interval);
    }
}
