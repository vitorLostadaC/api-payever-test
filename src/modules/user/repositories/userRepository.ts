import { User } from '../entitie/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByIdReqres(userId: string): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
