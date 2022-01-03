import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailInput } from './email.input';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  makeManager(@Args('email') emailBody: EmailInput) {
    const { email } = emailBody;
    return this.usersService.makeManager(email);
  }
}
