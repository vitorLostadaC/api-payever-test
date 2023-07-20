import { generateAndSaveImage } from 'src/utils/generateBlankImage';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { DeleteUserAvatarUseCase } from './deleteUserAvatarUseCase';
import { makeUserFactory } from '../../factories/userFactory';
import * as fs from 'fs';
import { InvalidIdException } from '../../exceptions/invalidIdException';
import { ObjectId } from 'bson';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { UserHasNoAvatarException } from '../../exceptions/userHasNoAvatarException';

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserAvatarUseCase: DeleteUserAvatarUseCase;

describe('Delete Avatar Image User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserAvatarUseCase = new DeleteUserAvatarUseCase(
      userRepositoryInMemory,
    );
  });

  it('Shoul be able to delete avatar image', async () => {
    const user = makeUserFactory({
      avatar: 'teste.png',
    });

    userRepositoryInMemory.users = [user];

    const folderPathMockedImage = `${process.cwd()}/mocks/uploads`;
    const mockedfilePath = `${folderPathMockedImage}/${user.avatar}`;

    generateAndSaveImage({
      fileName: user.avatar,
      folderPath: folderPathMockedImage,
      height: 300,
      width: 300,
    });

    jest.spyOn(process, 'cwd').mockReturnValue(`${process.cwd()}/mocks`);

    let imageExists = fs.existsSync(mockedfilePath);

    expect(imageExists).toBe(true);

    await deleteUserAvatarUseCase.execute({
      id: user.id.toString(),
    });

    imageExists = fs.existsSync(mockedfilePath);

    expect(imageExists).toBe(false);
  });

  it('Should be able to throw an error when id is incorrect', async () => {
    expect(
      async () =>
        await deleteUserAvatarUseCase.execute({
          id: 'invalid id',
        }),
    ).rejects.toThrow(InvalidIdException);
  });

  it('Should be able to throw an error when user not found', () => {
    expect(
      async () =>
        await deleteUserAvatarUseCase.execute({
          id: new ObjectId().toString(),
        }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('Should be able to throw an error when user has not avatar', () => {
    const user = makeUserFactory({ avatar: null });

    userRepositoryInMemory.users = [user];

    expect(
      async () =>
        await deleteUserAvatarUseCase.execute({
          id: user.id.toString(),
        }),
    ).rejects.toThrow(UserHasNoAvatarException);
  });
});
