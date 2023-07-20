import { User } from 'src/modules/user/entitie/User';
import { UserRepository } from 'src/modules/user/repositories/userRepository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prismaUserMapper';
import { HttpService } from '@nestjs/axios';
import { UserReqresResponseSchema } from '../../reqres/schemas/userSchema';
import { ReqresUserMapper } from '../../reqres/mappers/reqresUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findById(userId: string): Promise<User | null> {
    // I don't like to do it this way, I always like to separate it into different repositories but since it doesn't fit in a different module, I preferred to leave it here

    const {
      data: { data },
    } = await this.httpService.axiosRef.get<UserReqresResponseSchema>(
      `https://reqres.in/api/users/${userId}`,
    );

    if (!data.id) return null;

    return ReqresUserMapper.toDomain(data);
  }
}
