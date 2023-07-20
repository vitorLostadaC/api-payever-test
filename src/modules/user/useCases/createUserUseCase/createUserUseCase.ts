import { Injectable } from '@nestjs/common';
import { User } from '../../entitie/User';
import { UserRepository } from '../../repositories/userRepository';
import { MailerService } from '@nestjs-modules/mailer';
import { RabbitMQService } from 'src/infra/rabbitMq/rabbitMq.service';
import { EmailAlredyRegisterException } from '../../exceptions/emailAlredyRegisterException';

interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailerService: MailerService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async execute({ first_name, last_name, email, avatar }: CreateUserRequest) {
    const userWithSomeEmail = this.userRepository.findByEmail(email);

    if (userWithSomeEmail) throw new EmailAlredyRegisterException();

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

    await this.rabbitMQService.sendMessage({ userId: user.id });

    return user;
  }
}
