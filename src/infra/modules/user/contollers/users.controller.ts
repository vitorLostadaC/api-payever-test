import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from '../dtos/createUserBody';

@Controller('users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { first_name, last_name, email } = body;

    const user = await this.createUserUseCase.execute({
      first_name,
      last_name,
      email,
    });

    return user;
  }
}
