import { User } from 'src/modules/user/entitie/User';
import { UserRepository } from 'src/modules/user/repositories/userRepository';
import { PrismaService } from '../prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prismaUserMapper';
import { HttpService } from '@nestjs/axios';
import { UserReqresResponseSchema } from '../../reqres/schemas/userSchema';
import { ReqresUserMapper } from '../../reqres/mappers/reqresUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private readonly logger = new Logger(PrismaService.name);

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByIdReqres(userId: string): Promise<User | null> {
    // I don't like to do it this way, I always like to separate it into different repositories but since it doesn't fit in a different module, I preferred to leave it here

    try {
      const {
        data: { data },
      } = await this.httpService.axiosRef.get<UserReqresResponseSchema>(
        `https://reqres.in/api/users/${userId}`,
      );

      return ReqresUserMapper.toDomain(data);
    } catch (e) {
      this.logger.warn(
        `Error to request reqres api. Response Error: ${e.response.status}`,
      );
      return null;
    }
  }
}
