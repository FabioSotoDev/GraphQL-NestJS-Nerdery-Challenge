import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.model';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { Book } from './models/book.model';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Book)
  async getBookById(@Args('id') id: string): Promise<Book> {
    const book = await this.booksService.getBookById(id);
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  @Mutation(() => Book)
  @UseGuards(UserAuthGuard)
  async createBook(
    @Args('input') createBookInput: CreateBookInput,
    @GetUser() user: User,
  ): Promise<Book> {
    if (user.userType === 'MANAGER') {
      return this.booksService.createBook(createBookInput);
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }
  }

  @Query(() => Book)
  @UseGuards(UserAuthGuard)
  async test() {
    return { body: 'asd' };
  }
}
