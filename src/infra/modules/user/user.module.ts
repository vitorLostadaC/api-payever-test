import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { UserController } from './contollers/user.controller';
import { UsersController } from './contollers/users.controller';
import { FindUserUseCase } from 'src/modules/user/useCases/findUserUseCase/findUserUseCaser';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserUseCase, FindUserUseCase],
  controllers: [UserController, UsersController],
})
export class UserModule {}
