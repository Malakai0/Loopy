const DISCORD_EPOCH: bigint = 1420070400000n;

export class Snowflake {
    private id: bigint;

    constructor(id: string) {
        this.id = BigInt(id);
    }

    get timestamp(): number {
        return Number((this.id >> 22n) + DISCORD_EPOCH);
    }

    get workerID(): number {
        return Number((this.id & 0x3e0000n) >> 17n);
    }

    get processID(): number {
        return Number((this.id & 0x1f000n) >> 12n);
    }

    get increment(): number {
        return Number(this.id & 0xfffn);
    }

    get date(): Date {
        return new Date(this.timestamp);
    }

    toString(): string {
        return this.id.toString();
    }
}

export function wrapSnowflake(id?: string): Snowflake | undefined {
    if (!id) return undefined;
    return new Snowflake(id);
}

export type SnowflakePayload = string;
