import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BSON } from 'bson';
import { UserRepository } from '../../repositories/userRepository';
import * as fs from 'fs';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { UserHasNoAvatarException } from '../../exceptions/userHasNoAvatarException';
import { InvalidIdException } from '../../exceptions/invalidIdException';

interface DeleteUserAvatarInterface {
  id: string;
}

@Injectable()
export class DeleteUserAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserAvatarInterface) {
    if (!BSON.ObjectId.isValid(id)) throw new InvalidIdException();

    const currentUser = await this.userRepository.findById(id);

    if (!currentUser?.id) throw new UserNotFoundException();

    if (!currentUser.avatar) throw new UserHasNoAvatarException();

    const avatarPath = `${process.cwd()}/uploads/${currentUser.avatar}`;
    await fs.promises.unlink(avatarPath);

    currentUser.avatar = null;

    await this.userRepository.save(currentUser);
  }
}
