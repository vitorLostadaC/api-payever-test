import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';

interface FindUserRequest {
  id: string;
}

@Injectable()
export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: FindUserRequest) {
    const user = await this.userRepository.findByIdReqres(id);

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
