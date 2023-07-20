import { User } from '../../entitie/User';
import { UserRepository } from '../../repositories/UserRepository';
type CreateUserRequest = {
  name: string;
  first_name: string;
  last_name: string;
  avatar?: string; //TODO create after
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ first_name, last_name, name, avatar }: CreateUserRequest) {
    const user = new User({
      first_name,
      last_name,
      name,
      avatar,
    });

    await this.userRepository.create(user);

    return user;
  }
}
