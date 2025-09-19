"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessagingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
let MessagingService = MessagingService_1 = class MessagingService {
    logger = new common_1.Logger(MessagingService_1.name);
    connection = null;
    channel = null;
    async connect(url) {
        if (this.connection)
            return;
        this.connection = await (0, amqplib_1.connect)(url);
        this.channel = await this.connection.createChannel();
    }
    async assertExchange(name, type = 'topic', options) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        await this.channel.assertExchange(name, type, options);
    }
    publish(exchange, routingKey, content, options) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        this.channel.publish(exchange, routingKey, content, options);
    }
    async assertQueue(name, options) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        await this.channel.assertQueue(name, options);
    }
    async bindQueue(queue, exchange, pattern) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        await this.channel.bindQueue(queue, exchange, pattern);
    }
    async consume(queue, onMessage, options) {
        if (!this.channel)
            throw new Error('Channel not initialized');
        await this.channel.consume(queue, onMessage, options);
    }
    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
                this.channel = null;
            }
            if (this.connection) {
                await this.connection.close();
                this.connection = null;
            }
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.logger.error('Error while closing AMQP resources: ' + msg);
        }
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = MessagingService_1 = __decorate([
    (0, common_1.Injectable)()
], MessagingService);
//# sourceMappingURL=messaging.service.js.map