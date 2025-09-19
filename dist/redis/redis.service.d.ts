import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    getClient(): Redis;
    get<T = string>(key: string): Promise<T | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<'OK' | null>;
    del(key: string): Promise<number>;
    onModuleDestroy(): Promise<void>;
}
