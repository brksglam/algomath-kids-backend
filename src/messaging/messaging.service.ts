import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Channel, Connection, ConsumeMessage, connect } from 'amqplib';

@Injectable()
export class MessagingService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessagingService.name);
  private connection?: Connection;
  private channel?: Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    try {
      await this.ensureConnection();
    } catch (error) {
      this.logger.warn('RabbitMQ connection failed during init: ' + (error as Error).message);
    }
  }

  async onModuleDestroy() {
    await this.channel?.close().catch((error) => this.logger.error('Failed to close RabbitMQ channel', error));
    await this.connection?.close().catch((error) => this.logger.error('Failed to close RabbitMQ connection', error));
  }

  async publish(routingKey: string, message: Record<string, unknown>) {
    const channel = await this.ensureConnection();
    if (!channel) {
      this.logger.warn('RabbitMQ channel is unavailable; skipping publish');
      return;
    }

    const exchange = this.configService.get<string>('RABBITMQ_EXCHANGE', 'app-events');
    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message), 'utf-8'));
  }

  async consume(
    queue: string,
    onMessage: (message: ConsumeMessage | null) => void,
    routingKey = '#',
  ) {
    const channel = await this.ensureConnection();
    if (!channel) {
      this.logger.warn('RabbitMQ channel is unavailable; cannot consume messages');
      return;
    }

    const exchange = this.configService.get<string>('RABBITMQ_EXCHANGE', 'app-events');
    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, onMessage, { noAck: false });
  }

  private async ensureConnection(): Promise<Channel | undefined> {
    if (this.channel) {
      return this.channel;
    }

    const url = this.configService.get<string>('RABBITMQ_URL');
    if (!url) {
      this.logger.warn('RABBITMQ_URL is not configured');
      return undefined;
    }

    try {
      this.connection = await connect(url);
      this.channel = await this.connection.createChannel();
      return this.channel;
    } catch (error) {
      this.logger.warn('RabbitMQ connection error: ' + (error as Error).message);
      return undefined;
    }
  }
}
