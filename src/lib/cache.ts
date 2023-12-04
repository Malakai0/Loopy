const MAX_CACHE_SIZE: number = 1000;

const hash = (key: string): number => {
    return key.split("").reduce((a: number, b: string) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
};

type Cacheable = {
    id: string;
};
type AcceptableInput = Cacheable | string;

function getSnowflake(key: AcceptableInput): string {
    if (typeof key === "string") {
        return key;
    } else {
        return key.id;
    }
}

export class AsyncCache<T extends Cacheable> {
    private cache: Map<number, any>;

    constructor() {
        this.cache = new Map();
    }

    async create(key: AcceptableInput): Promise<T> {
        throw new Error("Cache#create: Not implemented");
    }

    async get(key: AcceptableInput): Promise<T> {
        const id = getSnowflake(key);
        const cached = this.cache.get(hash(id));

        if (cached) {
            return cached;
        }

        return await this.create(id);
    }

    get_raw(key: AcceptableInput): T {
        const id: number = hash(getSnowflake(key));
        return this.cache.get(id);
    }

    set(key: AcceptableInput, value: T): void {
        const id: number = hash(getSnowflake(key));
        if (this.cache.size >= MAX_CACHE_SIZE) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(id, value);
    }

    delete(key: AcceptableInput): boolean {
        const id: number = hash(getSnowflake(key));
        return this.cache.delete(id);
    }

    clear(): void {
        this.cache.clear();
    }
}
