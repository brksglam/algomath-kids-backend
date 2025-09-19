import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client?: Redis;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('REDIS_URL');
    if (!url) {
      this.logger.warn(
        'REDIS_URL not provided. Redis features will be disabled.',
      );
      return;
    }

    // Establish client with lazy connect and safe error handlers
    this.client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 0,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    });

    this.client.on('error', (err: Error) => {
      this.logger.warn('Redis connection error: ' + err.message);
    });

    this.client.on('end', () => {
      this.logger.warn('Redis connection closed');
    });

    this.client
      .connect()
      .then(() => this.logger.log('Connected to Redis instance'))
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(
          'Could not connect to Redis. Features disabled. Reason: ' + msg,
        );
        try {
          this.client?.disconnect();
        } finally {
          this.client = undefined;
        }
      });
  }

  isEnabled(): boolean {
    return !!this.client;
  }

  getClient(): Redis {
    if (!this.client) {
      throw new Error(
        'Redis client is not configured. Ensure REDIS_URL is set.',
      );
    }
    return this.client;
  }

  async get<T = string>(key: string): Promise<T | null> {
    if (!this.client) {
      return null;
    }
    const value = await this.client.get(key);
    return value as unknown as T | null;
  }

  async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<'OK' | null> {
    if (!this.client) {
      return null;
    }

    if (ttlSeconds) {
      return this.client.set(key, value, 'EX', ttlSeconds);
    }

    return this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    if (!this.client) {
      return 0;
    }
    return this.client.del(key);
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
}
