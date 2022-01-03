import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { OrderStatus, Prisma } from '@prisma/client';
import { User } from 'src/users/user.model';

@ObjectType({ description: 'order' })
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLDecimal)
  totalPrice: Prisma.Decimal;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDay: Date;

  @Field()
  orderStatus: OrderStatus;

  @Field()
  userId: string;

  @Field(() => User)
  User: User;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
