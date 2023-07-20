import { ObjectId } from 'bson';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { makeUserFactory } from '../../factories/userFactory';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { GetUserAvatarUseCase } from './getUserAvatarUseCase';
import { generateAndSaveImage } from 'src/utils/generateBlankImage';
import * as fs from 'fs';
import { InvalidIdException } from '../../exceptions/invalidIdException';
import { UserHasNoAvatarException } from '../../exceptions/userHasNoAvatarException';

let userRepositoryInMemory: UserRepositoryInMemory;
let getUserAvatarUseCase: GetUserAvatarUseCase;

describe('Get user avatar', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getUserAvatarUseCase = new GetUserAvatarUseCase(userRepositoryInMemory);
  });

  it('Should be able to get user avatar in base64', async () => {
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

    const imageExists = fs.existsSync(mockedfilePath);
    expect(imageExists).toBe(true);

    const base64Image = await getUserAvatarUseCase.execute({
      id: user.id.toString(),
    });

    const fileBuffer = fs.readFileSync(mockedfilePath);
    const base64MockedFile = Buffer.from(fileBuffer).toString('base64');

    expect(base64Image).toEqual(base64MockedFile);
  });

  it('Should be able to throw an error when id is incorrect', async () => {
    expect(
      async () =>
        await getUserAvatarUseCase.execute({
          id: 'invalid id',
        }),
    ).rejects.toThrow(InvalidIdException);
  });

  it('Should be able to throw an error when user not found', () => {
    expect(
      async () =>
        await getUserAvatarUseCase.execute({
          id: new ObjectId().toString(),
        }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('Should be able to throw an error when user has not avatar', () => {
    const user = makeUserFactory({ avatar: null });

    userRepositoryInMemory.users = [user];

    expect(
      async () =>
        await getUserAvatarUseCase.execute({
          id: user.id.toString(),
        }),
    ).rejects.toThrow(UserHasNoAvatarException);
  });
});
