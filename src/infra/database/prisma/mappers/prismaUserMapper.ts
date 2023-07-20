import { ObjectId } from 'bson';
import { User } from '../../../../modules/user/entitie/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ avatar, first_name, id, last_name, email }: User): UserRaw {
    return {
      first_name,
      id: id.toString(),
      last_name,
      email,
      avatar,
    };
  }

  static toDomain({ avatar, first_name, id, last_name, email }: UserRaw): User {
    return new User(
      {
        first_name,
        last_name,
        email,
        avatar,
      },
      id.toString() as unknown as ObjectId,
    );
  }
}
