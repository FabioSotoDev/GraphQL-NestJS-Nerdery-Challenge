import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  userType: UserType;
}
