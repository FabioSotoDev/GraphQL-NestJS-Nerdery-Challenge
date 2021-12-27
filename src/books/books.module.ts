import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  controllers: [],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
