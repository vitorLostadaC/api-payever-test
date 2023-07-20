import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';
import { PrismaUserRepository } from '../database/prisma/repositories/prismaUserRepository';

@Injectable()
export class RabbitMQService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PrismaUserRepository.name);
  private connection: Connection;
  private channel: Channel;
  private queueName = 'user_created';

  async onApplicationBootstrap() {
    try {
      this.connection = await connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName);
      this.logger.log('RabbitMQ connected');
    } catch (error) {
      throw new Error('Error to connect RabbitMQ.');
    }
  }

  async sendMessage(message: any) {
    try {
      this.channel.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(message)),
      );
    } catch (error) {
      this.logger.error('Error publishing message on queue.');
    }
  }
}
