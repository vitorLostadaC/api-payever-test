import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BSON } from 'bson';
import { UserRepository } from '../../repositories/userRepository';
import * as fs from 'fs';

interface DeleteUserAvatarInterface {
  id: string;
}

@Injectable()
export class DeleteUserAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserAvatarInterface) {
    if (!BSON.ObjectId.isValid(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const currentUser = await this.userRepository.findById(id);

    if (!currentUser.id)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (!currentUser.avatar)
      throw new HttpException(`User has no avatar`, HttpStatus.BAD_REQUEST);

    const avatarPath = `${process.cwd()}/uploads/${currentUser.avatar}`;
    await fs.promises.unlink(avatarPath);

    currentUser.avatar = null;

    await this.userRepository.save(currentUser);
  }
}
