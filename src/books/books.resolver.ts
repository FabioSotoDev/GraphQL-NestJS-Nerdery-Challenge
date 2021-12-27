import { NotFoundException } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
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
  async createBook(
    @Args('input') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.booksService.createBook(createBookInput);
    /*if (user.userType === 'MANAGER') {
      return this.booksService.createBook(createBookInput);
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }*/
  }
}
