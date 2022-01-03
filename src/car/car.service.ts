import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(readonly prisma: PrismaService) {}

  getCar(userId: string) {
    return this.prisma.order.findMany({
      where: { userId: userId, orderStatus: 'PENDING' },
      include: {
        OrderBook: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async addBooktoCar(bookId: string, userId: string) {
    const car = await this.prisma.order.findMany({
      where: { userId: userId, orderStatus: 'PENDING' },
    });
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (car.length > 0) {
      const order = await this.prisma.orderBook.findMany({
        where: { orderId: car[0].id, bookId: bookId },
      });
      if (order.length > 0) {
        await this.prisma.$transaction([
          this.prisma.orderBook.update({
            where: { id: order[0].id },
            data: {
              quantity: { increment: 1 },
              price: { increment: book.price },
            },
          }),
          this.prisma.order.update({
            where: { id: car[0].id },
            data: { totalPrice: { increment: book.price } },
          }),
        ]);
      } else {
        await this.prisma.orderBook.create({
          data: {
            bookId: bookId,
            orderId: car[0].id,
            price: book.price,
          },
        });
      }
    } else {
      const newCar = await this.prisma.order.create({
        data: { totalPrice: book.price, userId: userId },
      });
      await this.prisma.orderBook.create({
        data: {
          bookId: bookId,
          orderId: newCar.id,
          price: book.price,
        },
      });
    }
    return this.getCar(userId);
  }

  async buy(userId: string) {
    const order = await this.getCar(userId);
    if (order.length > 0) {
      return this.prisma.order.update({
        where: { id: order[0].id },
        data: {
          orderStatus: { set: 'FINISHED' },
          paymentDay: { set: new Date() },
        },
        include: {
          OrderBook: {
            include: { book: true },
          },
        },
      });
    }
    return new NotFoundException('The Car Is Empty');
  }

  async cancelCar(userId: string) {
    const order = await this.getCar(userId);
    if (order.length > 0) {
      return this.prisma.order.update({
        where: { id: order[0].id },
        data: {
          orderStatus: { set: 'CANCELED' },
        },
        include: {
          OrderBook: {
            include: { book: true },
          },
        },
      });
    }
    return new NotFoundException('Not Items in Car');
  }
}
