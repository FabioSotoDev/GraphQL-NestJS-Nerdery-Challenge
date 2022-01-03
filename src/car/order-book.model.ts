import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Prisma } from '@prisma/client';
import { Book } from 'src/books/models/book.model';

@ObjectType({ description: 'order_book' })
export class OrderBook {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLDecimal)
  price: Prisma.Decimal;

  @Field()
  quantity: number;

  @Field(() => Book)
  book: Book;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
