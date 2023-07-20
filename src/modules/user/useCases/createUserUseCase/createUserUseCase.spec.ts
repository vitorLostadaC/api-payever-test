import { MailerService } from '@nestjs-modules/mailer';
import { RabbitMQService } from 'src/infra/rabbitMq/rabbitMq.service';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';
import { makeUserFactory } from '../../factories/userFactory';
import { EmailAlredyRegisterException } from '../../exceptions/emailAlredyRegisterException';

const mailerServiceMocked = {
  sendMail: jest.fn(),
} as unknown as MailerService;

const rabbitMQServiceMocked = {
  sendMessage: jest.fn(),
} as unknown as RabbitMQService;

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(
      userRepositoryInMemory,
      mailerServiceMocked,
      rabbitMQServiceMocked,
    );
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'vitorlostada@hotmail.com',
      first_name: 'Vitor',
      last_name: 'Cunha',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to throw error when email alredy exist', () => {
    const user = makeUserFactory({ email: 'vitorlostada@hotmail.com' });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await createUserUseCase.execute({
        email: user.email,
        first_name: 'Vitor',
        last_name: 'Cunha',
      });
    }).rejects.toThrow(EmailAlredyRegisterException);
  });
});
