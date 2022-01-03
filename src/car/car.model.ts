import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { OrderStatus, Prisma } from '@prisma/client';
import { OrderBook } from './order-book.model';

@ObjectType({ description: 'car' })
export class Car {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLDecimal)
  totalPrice: Prisma.Decimal;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDay: Date;

  @Field()
  orderStatus: OrderStatus;

  @Field(() => [OrderBook])
  OrderBook: OrderBook[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
