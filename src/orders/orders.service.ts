import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  getOrders(skip: number, take: number) {
    return this.prisma.order.findMany({
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' },
      include: {
        User: true,
      },
    });
  }
}
