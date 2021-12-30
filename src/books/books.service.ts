import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './models/book.model';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  getBooks(skip: number, take: number) {
    return this.prisma.book.findMany({
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' },
    });
  }

  getBookById(id: string): Promise<Book> {
    return this.prisma.book.findUnique({ where: { id: id } });
  }

  createBook(createBookInput: CreateBookInput) {
    return this.prisma.book.create({ data: createBookInput });
  }

  updateBook(id: string, updateBookInput: UpdateBookInput) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  async likeBook(id: string, user: User) {
    const like = await this.prisma.likeUserBook.findMany({
      where: { userId: user.id, bookId: id },
    });
    if (like.length > 0) {
      return this.prisma.likeUserBook.delete({ where: { id: like[0].id } });
    } else {
      return this.prisma.likeUserBook.create({
        data: { userId: user.id, bookId: id },
      });
    }
  }
}
