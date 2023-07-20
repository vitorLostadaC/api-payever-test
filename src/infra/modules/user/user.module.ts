import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { UserController } from './contollers/user.controller';
import { UsersController } from './contollers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserUseCase],
  controllers: [UserController, UsersController],
})
export class UserModule {}
