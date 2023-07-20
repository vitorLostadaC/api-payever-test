import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { UserController } from './contollers/user.controller';
import { UsersController } from './contollers/users.controller';
import { FindUserUseCase } from 'src/modules/user/useCases/findUserUseCase/findUserUseCaser';
import { GetUserAvatarUseCase } from 'src/modules/user/useCases/getUserAvatarUseCase/getUserAvatarUseCase';
import { DeleteUserAvatarUseCase } from 'src/modules/user/useCases/deleteUserAvatarUseCase/deleteUserAvatarUseCase';
import { RabbitMQService } from 'src/infra/rabbitMq/rabbitMq.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    GetUserAvatarUseCase,
    DeleteUserAvatarUseCase,
    RabbitMQService,
  ],
  controllers: [UserController, UsersController],
})
export class UserModule {}
