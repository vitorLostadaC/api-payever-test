import { Controller, Get, Param } from '@nestjs/common';
import { FindUserUseCase } from '../../../../modules/user/useCases/findUserUseCase/findUserUseCaser';
import { UserViewModel } from '../viewModels/userViewModel';
import { GetUserAvatarUseCase } from '../../../../modules/user/useCases/getUserAvatarUseCase/getUserAvatarUseCase';

@Controller('user')
export class UserController {
  constructor(
    private findUserUseCase: FindUserUseCase,
    private getUserAvatarUseCase: GetUserAvatarUseCase,
  ) {}

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.findUserUseCase.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @Get(':id/avatar')
  async findUserAvatar(@Param('id') id: string) {
    const avatar = await this.getUserAvatarUseCase.execute({ id });
    return { avatar };
  }
}
