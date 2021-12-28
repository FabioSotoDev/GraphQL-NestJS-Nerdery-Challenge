import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialInput } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialInput: AuthCredentialInput) {
    const { email, password } = authCredentialInput;
    const user = await this.userService.findUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Incorrect Credentials');
    }
  }

  async signUp(authCredentialInput: AuthCredentialInput) {
    const { email } = authCredentialInput;
    if (await this.prisma.user.count({ where: { email: email } })) {
      throw new ConflictException('email already taken');
    }
    return this.prisma.user.create({ data: authCredentialInput });
  }
}
