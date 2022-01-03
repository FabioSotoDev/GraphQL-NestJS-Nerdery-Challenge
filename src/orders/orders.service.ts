import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(skip: number, take: number) {
    const temp = await this.prisma.order.findMany({
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' },
      include: {
        User: true,
      },
    });
    console.log(temp);
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
