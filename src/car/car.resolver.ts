import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.model';
import { Car } from './car.model';
import { CarService } from './car.service';

@Resolver(() => Car)
export class CarResolver {
  constructor(readonly carService: CarService) {}

  @Mutation(() => [Car])
  @UseGuards(UserAuthGuard)
  car(@GetUser() user: User) {
    return this.carService.getCar(user.id);
  }

  @Mutation(() => [Car])
  @UseGuards(UserAuthGuard)
  addBookToCar(@Args('bookId') bookId: string, @GetUser() user: User) {
    return this.carService.addBooktoCar(bookId, user.id);
  }

  @Mutation(() => Car)
  @UseGuards(UserAuthGuard)
  buy(@GetUser() user: User) {
    return this.carService.buy(user.id);
  }

  @Mutation(() => Car)
  @UseGuards(UserAuthGuard)
  cancel(@GetUser() user: User) {
    return this.carService.cancelCar(user.id);
  }
}
