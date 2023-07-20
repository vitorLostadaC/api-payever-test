import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './infra/modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
