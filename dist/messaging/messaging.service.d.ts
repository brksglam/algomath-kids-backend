import * as amqplib from 'amqplib';
export declare class MessagingService {
    private readonly logger;
    private connection;
    private channel;
    connect(url: string): Promise<void>;
    assertExchange(name: string, type?: amqplib.ExchangeType, options?: amqplib.Options.AssertExchange): Promise<void>;
    publish(exchange: string, routingKey: string, content: Buffer, options?: amqplib.Options.Publish): void;
    assertQueue(name: string, options?: amqplib.Options.AssertQueue): Promise<void>;
    bindQueue(queue: string, exchange: string, pattern: string): Promise<void>;
    consume(queue: string, onMessage: (msg: amqplib.ConsumeMessage | null) => void, options?: amqplib.Options.Consume): Promise<void>;
    close(): Promise<void>;
}
