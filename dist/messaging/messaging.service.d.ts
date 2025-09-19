import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumeMessage } from 'amqplib';
export declare class MessagingService implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private readonly logger;
    private connection?;
    private channel?;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    publish(routingKey: string, message: Record<string, unknown>): Promise<void>;
    consume(queue: string, onMessage: (message: ConsumeMessage | null) => void, routingKey?: string): Promise<void>;
    private ensureConnection;
}
