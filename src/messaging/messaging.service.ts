import { Injectable, Logger } from '@nestjs/common';
import * as amqplib from 'amqplib';

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);
  private connection: amqplib.Connection | null = null;
  private channel: amqplib.Channel | null = null;

  async connect(url: string) {
    if (this.connection) return;
    this.connection = await amqplib.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async assertExchange(
    name: string,
    type: amqplib.ExchangeType = 'topic',
    options?: amqplib.Options.AssertExchange,
  ) {
    if (!this.channel) throw new Error('Channel not initialized');
    await this.channel.assertExchange(name, type, options);
  }

  publish(
    exchange: string,
    routingKey: string,
    content: Buffer,
    options?: amqplib.Options.Publish,
  ) {
    if (!this.channel) throw new Error('Channel not initialized');
    this.channel.publish(exchange, routingKey, content, options);
  }

  async assertQueue(name: string, options?: amqplib.Options.AssertQueue) {
    if (!this.channel) throw new Error('Channel not initialized');
    await this.channel.assertQueue(name, options);
  }

  async bindQueue(queue: string, exchange: string, pattern: string) {
    if (!this.channel) throw new Error('Channel not initialized');
    await this.channel.bindQueue(queue, exchange, pattern);
  }

  async consume(
    queue: string,
    onMessage: (msg: amqplib.ConsumeMessage | null) => void,
    options?: amqplib.Options.Consume,
  ) {
    if (!this.channel) throw new Error('Channel not initialized');
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error('Error while closing AMQP resources: ' + msg);
    }
  }
}
