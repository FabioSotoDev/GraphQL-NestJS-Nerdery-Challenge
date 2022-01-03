import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Incorrect Credentials');
    }
  }

  async makeManager(email: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { email: email },
      data: { userType: { set: 'MANAGER' } },
    });
    return user;
  }
}
