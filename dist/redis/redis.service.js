"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    configService;
    logger = new common_1.Logger(RedisService_1.name);
    client;
    constructor(configService) {
        this.configService = configService;
        const url = this.configService.get('REDIS_URL');
        if (!url) {
            this.logger.warn('REDIS_URL not provided. Redis features will be disabled.');
            return;
        }
        this.client = new ioredis_1.default(url, {
            lazyConnect: true,
            maxRetriesPerRequest: 0,
            enableOfflineQueue: false,
            retryStrategy: () => null,
        });
        this.client.on('error', (err) => {
            this.logger.warn('Redis connection error: ' + err.message);
        });
        this.client.on('end', () => {
            this.logger.warn('Redis connection closed');
        });
        this.client
            .connect()
            .then(() => this.logger.log('Connected to Redis instance'))
            .catch((err) => {
            this.logger.warn('Could not connect to Redis. Features disabled. Reason: ' + err.message);
            try {
                this.client?.disconnect();
            }
            finally {
                this.client = undefined;
            }
        });
    }
    isEnabled() {
        return !!this.client;
    }
    getClient() {
        if (!this.client) {
            throw new Error('Redis client is not configured. Ensure REDIS_URL is set.');
        }
        return this.client;
    }
    async get(key) {
        if (!this.client) {
            return null;
        }
        const value = await this.client.get(key);
        return value;
    }
    async set(key, value, ttlSeconds) {
        if (!this.client) {
            return null;
        }
        if (ttlSeconds) {
            return this.client.set(key, value, 'EX', ttlSeconds);
        }
        return this.client.set(key, value);
    }
    async del(key) {
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
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map