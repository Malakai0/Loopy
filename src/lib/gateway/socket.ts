import WebSocket from "ws";
import { EventEmitter } from "events";

interface Payload<T> {
    op: number;
    d: T;
    s: number;
    t: string;
}

class Socket {
    private emitter: EventEmitter;
    private gateway?: string;
    private ws: WebSocket | undefined;

    constructor(gateway?: string) {
        this.emitter = new EventEmitter();

        if (gateway) {
            this.gateway = gateway;
        }
    }

    set_gateway(gateway: string): void {
        this.gateway = gateway;
    }

    connect(): void {
        if (!this.gateway) {
            throw new Error("Gateway not set.");
        }

        this.ws = new WebSocket(this.gateway);
        this.ws.on("message", (data: any) => {
            const payload: Payload<any> = JSON.parse(data.toString());
            this.emitter.emit(payload.op.toString(), payload);
        });
        this.ws.on("close", () => {
            console.log("Connection closed.");
        });
        this.ws.on("error", (err: Error) => {
            console.log("Connection error.");
            console.log(err);
        });
    }

    send(data: any): void {
        if (!this.ws) {
            throw new Error("Socket not connected.");
        }
        this.ws.send(JSON.stringify(data));
    }

    listen<T>(op: number, callback: (payload: Payload<T>) => void): void {
        this.emitter.on(op.toString(), callback);
    }
}

export { Socket };
