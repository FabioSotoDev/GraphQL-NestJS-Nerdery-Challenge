import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}
