import { User } from '../entitie/User';
import { UserRepository } from './userRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByIdReqres(id: string): Promise<User> {
    const currentUser = this.users.find((user) => user.id.toString() === id);

    if (!currentUser) return null;

    return currentUser;
  }

  async findById(id: string): Promise<User> {
    const currentUser = this.users.find((user) => user.id.toString() === id);

    if (!currentUser) return null;

    return currentUser;
  }

  async findByEmail(email: string): Promise<User> {
    const currentUser = this.users.find((user) => user.email === email);

    if (!currentUser) return null;

    return currentUser;
  }

  async save(user: User): Promise<void> {
    const currentUserIndex = this.users.findIndex(
      (userInUsers) => userInUsers.id === user.id,
    );

    if (currentUserIndex >= 0) this.users[currentUserIndex] = user;
  }
}
