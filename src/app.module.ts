import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './infra/modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RabbitMQService } from './infra/rabbitMq/rabbitMq.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: 2525,
        secure: false,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [RabbitMQService],
})
export class AppModule {}
