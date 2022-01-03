import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [AuthModule],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
