import { ObjectId } from 'bson';
import { User } from '../entitie/User';

type Override = Partial<User>;

const makeUserFactory = ({ id = new ObjectId(), ...override }: Override) => {
  return new User(
    {
      email: 'vitinho@gmail.com',
      first_name: 'Vitor',
      last_name: 'Cunha',
      ...override,
    },
    id,
  );
};

export { makeUserFactory };
