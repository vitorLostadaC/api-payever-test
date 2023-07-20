import { Injectable } from '@nestjs/common';
import { User } from '../../entitie/User';
import { UserRepository } from '../../repositories/userRepository';
import { MailerService } from '@nestjs-modules/mailer';

type CreateUserRequest = {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailerService: MailerService,
  ) {}

  async execute({ first_name, last_name, email, avatar }: CreateUserRequest) {
    const user = new User({
      first_name,
      last_name,
      email,
      avatar,
    });

    await this.userRepository.create(user);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our app!',
      context: { name: first_name },
    });

    return user;
  }
}
