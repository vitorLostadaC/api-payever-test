import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FindUserUseCase } from '../../../../modules/user/useCases/findUserUseCase/findUserUseCaser';
import { UserViewModel } from '../viewModels/userViewModel';
import { GetUserAvatarUseCase } from '../../../../modules/user/useCases/getUserAvatarUseCase/getUserAvatarUseCase';
import { DeleteUserAvatarUseCase } from '../../../../modules/user/useCases/deleteUserAvatarUseCase/deleteUserAvatarUseCase';

@Controller('user')
export class UserController {
  constructor(
    private findUserUseCase: FindUserUseCase,
    private getUserAvatarUseCase: GetUserAvatarUseCase,
    private deleteUserAvatarUseCase: DeleteUserAvatarUseCase,
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

  @Delete(':id/avatar')
  async deleteUserAvatar(@Param('id') id: string) {
    const avatar = await this.deleteUserAvatarUseCase.execute({ id });
    return { avatar };
  }
}
