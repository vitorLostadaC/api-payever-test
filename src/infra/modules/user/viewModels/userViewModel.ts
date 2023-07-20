import { User } from 'src/modules/user/entitie/User';

export class UserViewModel {
  static toHTTP({ avatar, email, first_name, id, last_name }: User) {
    return {
      id,
      email,
      first_name,
      last_name,
      avatar,
    };
  }
}
