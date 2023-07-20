import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/userRepository';

interface FindUserRequest {
  id: string;
}

@Injectable()
export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: FindUserRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
