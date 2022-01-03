import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Prisma } from '@prisma/client';

@ObjectType({ description: 'book' })
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => GraphQLDecimal)
  price: Prisma.Decimal;

  @Field()
  imageUrl: string;

  @Field()
  stock: number;

  @Field()
  enabled: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
