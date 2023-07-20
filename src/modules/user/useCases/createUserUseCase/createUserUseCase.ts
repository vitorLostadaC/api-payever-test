import { User } from '../../entitie/User';
import { UserRepository } from '../../repositories/userRepository';
type CreateUserRequest = {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string; //TODO create after
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ first_name, last_name, email, avatar }: CreateUserRequest) {
    const user = new User({
      first_name,
      last_name,
      email,
      avatar,
    });

    await this.userRepository.create(user);

    return user;
  }
}
