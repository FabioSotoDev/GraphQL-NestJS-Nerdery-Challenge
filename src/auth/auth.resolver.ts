import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Token } from './token.model';
import { User } from 'src/users/user.model';
import { AuthService } from './auth.service';
import { AuthCredentialInput } from './dto/auth-credential.input';
@Resolver(() => [Token, User])
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async signIn(
    @Args('input') authCredentialInput: AuthCredentialInput,
  ): Promise<Token> {
    return this.authService.signIn(authCredentialInput);
  }

  @Mutation(() => User)
  async signUp(@Args('input') authCredentialInput: AuthCredentialInput) {
    const salt = await bcrypt.genSalt();
    authCredentialInput.password = await bcrypt.hash(
      authCredentialInput.password,
      salt,
    );
    return this.authService.signUp(authCredentialInput);
  }
}
