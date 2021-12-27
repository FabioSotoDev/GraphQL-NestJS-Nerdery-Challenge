import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsNumber()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  stock?: number;
}
