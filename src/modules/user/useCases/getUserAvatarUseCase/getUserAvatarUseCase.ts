import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';
import { BSON } from 'bson';
import * as fs from 'fs';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { InvalidIdException } from '../../exceptions/invalidIdException';

interface GetUserAvatarRequest {
  id: string;
}

@Injectable()
export class GetUserAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserAvatarRequest) {
    if (!BSON.ObjectId.isValid(id)) throw new InvalidIdException();

    const currentUser = await this.userRepository.findById(id);

    if (!currentUser.id) throw new UserNotFoundException();

    const avatarPath = `${process.cwd()}/uploads/${currentUser.avatar}`;
    const avatarBuffer = fs.readFileSync(avatarPath);
    const b64Avatar = Buffer.from(avatarBuffer).toString('base64');

    return b64Avatar;
  }
}
