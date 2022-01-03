import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CarResolver } from './car.resolver';
import { CarService } from './car.service';

@Module({
  imports: [AuthModule],
  providers: [CarResolver, CarService],
})
export class CarModule {}
