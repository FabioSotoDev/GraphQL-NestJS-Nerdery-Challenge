import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.model';
import { Pagination } from 'src/utils/prisma-pagination.dto';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './models/book.model';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book])
  getBooks(@Args('pagination', { nullable: true }) pagination: Pagination) {
    const { skip, take } = pagination;
    return this.booksService.getBooks(skip, take);
  }

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

  @Mutation(() => Book)
  @UseGuards(UserAuthGuard)
  updateBook(
    @Args('id') id: string,
    @Args('input') updateBookInput: UpdateBookInput,
    @GetUser() user: User,
  ) {
    if (user.userType === 'MANAGER') {
      return this.booksService.updateBook(id, updateBookInput);
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }
  }
}
