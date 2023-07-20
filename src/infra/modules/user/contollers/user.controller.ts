import { Controller, Get, Param } from '@nestjs/common';
import { FindUserUseCase } from '../../../../modules/user/useCases/findUserUseCase/findUserUseCaser';
import { UserViewModel } from '../viewModels/userViewModel';

@Controller('user')
export class UserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.findUserUseCase.execute({ id });
    return UserViewModel.toHTTP(user);
  }
}
