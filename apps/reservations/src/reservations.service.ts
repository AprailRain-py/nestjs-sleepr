import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) { }

  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create(createReservationDto);
  }

  findAll() {
    return this.reservationsRepository.find();
  }

  findOne(id: string) {
    return this.reservationsRepository.findOne({
      _id: new Types.ObjectId(id),
    });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateReservationDto,
    );
  }

  remove(id: string) {
    return this.reservationsRepository.delete({ _id: new Types.ObjectId(id) });
  }
}
