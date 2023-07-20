import { ObjectId } from 'bson';
import { User } from '../../../../modules/user/entitie/User';
import { UserReqresSchema } from '../schemas/userSchema';

export class ReqresUserMapper {
  static toDomain({
    avatar,
    first_name,
    id,
    last_name,
    email,
  }: UserReqresSchema): User {
    return new User(
      {
        first_name,
        last_name,
        email,
        avatar,
      },
      String(id) as unknown as ObjectId,
    );
  }
}
