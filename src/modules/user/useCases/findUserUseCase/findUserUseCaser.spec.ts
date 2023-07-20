import { ObjectId } from 'bson';
import { makeUserFactory } from '../../factories/userFactory';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { FindUserUseCase } from './findUserUseCaser';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';

let userRepositoryInMemory: UserRepositoryInMemory;
let findUserUseCase: FindUserUseCase;

describe('Find user with reqres api', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    findUserUseCase = new FindUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to find user', async () => {
    const user = makeUserFactory({});

    userRepositoryInMemory.users = [user];

    const currentUser = await findUserUseCase.execute({
      id: user.id.toString(),
    });

    expect(currentUser).toEqual(userRepositoryInMemory.users[0]);
  });

  it('Should be able to throw when not found user', async () => {
    expect(
      async () =>
        await findUserUseCase.execute({
          id: new ObjectId().toString(),
        }),
    ).rejects.toThrow(UserNotFoundException);
  });
});
