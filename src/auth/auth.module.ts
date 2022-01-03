import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecretKey',
      signOptions: {
        expiresIn: '365d',
      },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy, AuthResolver],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
