const MAX_CACHE_SIZE: number = 1000;

type Cacheable =
    | {
          id: string;
      }
    | string;

function getSnowflake(key: Cacheable): string {
    if (typeof key === "string") {
        return key;
    } else {
        return key.id;
    }
}

export class AsyncCache<T extends Cacheable> {
    private cache: Map<string, T>;

    constructor() {
        this.cache = new Map();
    }

    async create(key: Cacheable): Promise<T> {
        throw new Error("Cache#create: Not implemented");
    }

    get(key: Cacheable): Promise<T> {
        const id = getSnowflake(key);
        const cached = this.cache.get(id);

        if (cached) {
            return Promise.resolve(cached);
        }

        return this.create(key);
    }

    get_raw(key: Cacheable): T | undefined {
        return this.cache.get(getSnowflake(key));
    }

    set(key: Cacheable, value: T): void {
        if (this.cache.size >= MAX_CACHE_SIZE) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(getSnowflake(key), value);
    }

    delete(key: Cacheable): boolean {
        return this.cache.delete(getSnowflake(key));
    }

    clear(): void {
        this.cache.clear();
    }
}
