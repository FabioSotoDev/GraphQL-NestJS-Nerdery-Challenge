import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class Pagination {
  @Field({ nullable: true })
  @IsNumber()
  readonly skip: number = 0;

  @Field({ nullable: true })
  @IsNumber()
  readonly take: number = 10;
}
