import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.model';
import { Pagination } from 'src/utils/prisma-pagination.dto';
import { Order } from './models/order.model';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Query(() => [Order])
  @UseGuards(UserAuthGuard)
  getOrders(
    @Args('pagination', { nullable: true }) pagination: Pagination,
    @GetUser() user: User,
  ) {
    if (user.userType === 'MANAGER') {
      const { skip, take } = pagination;
      return this.orderService.getOrders(skip, take);
    } else {
      throw new UnauthorizedException('You Are Not Manager');
    }
  }
}
