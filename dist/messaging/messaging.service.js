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
var MessagingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqplib_1 = require("amqplib");
let MessagingService = MessagingService_1 = class MessagingService {
    configService;
    logger = new common_1.Logger(MessagingService_1.name);
    connection;
    channel;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        try {
            await this.ensureConnection();
        }
        catch (error) {
            this.logger.warn('RabbitMQ connection failed during init: ' + error.message);
        }
    }
    async onModuleDestroy() {
        await this.channel?.close().catch((error) => this.logger.error('Failed to close RabbitMQ channel', error));
        await this.connection?.close().catch((error) => this.logger.error('Failed to close RabbitMQ connection', error));
    }
    async publish(routingKey, message) {
        const channel = await this.ensureConnection();
        if (!channel) {
            this.logger.warn('RabbitMQ channel is unavailable; skipping publish');
            return;
        }
        const exchange = this.configService.get('RABBITMQ_EXCHANGE', 'app-events');
        await channel.assertExchange(exchange, 'topic', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message), 'utf-8'));
    }
    async consume(queue, onMessage, routingKey = '#') {
        const channel = await this.ensureConnection();
        if (!channel) {
            this.logger.warn('RabbitMQ channel is unavailable; cannot consume messages');
            return;
        }
        const exchange = this.configService.get('RABBITMQ_EXCHANGE', 'app-events');
        await channel.assertExchange(exchange, 'topic', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);
        channel.consume(queue, onMessage, { noAck: false });
    }
    async ensureConnection() {
        if (this.channel) {
            return this.channel;
        }
        const url = this.configService.get('RABBITMQ_URL');
        if (!url) {
            this.logger.warn('RABBITMQ_URL is not configured');
            return undefined;
        }
        try {
            this.connection = await (0, amqplib_1.connect)(url);
            this.channel = await this.connection.createChannel();
            return this.channel;
        }
        catch (error) {
            this.logger.warn('RabbitMQ connection error: ' + error.message);
            return undefined;
        }
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = MessagingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map