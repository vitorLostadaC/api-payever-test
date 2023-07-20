import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';
import { BSON } from 'bson';
import * as fs from 'fs';

interface GetUserAvatarRequest {
  id: string;
}

@Injectable()
export class GetUserAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserAvatarRequest) {
    if (!BSON.ObjectId.isValid(id))
      throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);

    const currentUser = await this.userRepository.findById(id);

    const avatarPath = `${process.cwd()}/uploads/${currentUser.avatar}`;
    const avatarBuffer = fs.readFileSync(avatarPath);
    const b64Avatar = Buffer.from(avatarBuffer).toString('base64');

    return b64Avatar;
  }
}
