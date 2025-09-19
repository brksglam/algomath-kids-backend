import { Options, MessageCallback } from 'amqplib';
export declare class MessagingService {
    private readonly logger;
    private connection;
    private channel;
    connect(url: string): Promise<void>;
    assertExchange(name: string, type?: string, options?: Options.AssertExchange): Promise<void>;
    publish(exchange: string, routingKey: string, content: Buffer, options?: Options.Publish): void;
    assertQueue(name: string, options?: Options.AssertQueue): Promise<void>;
    bindQueue(queue: string, exchange: string, pattern: string): Promise<void>;
    consume(queue: string, onMessage: MessageCallback, options?: Options.Consume): Promise<void>;
    close(): Promise<void>;
}
