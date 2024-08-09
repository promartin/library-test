import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
  ) { }

  async create(createRentDto: CreateRentDto): Promise<Rent> {
    const rent = this.rentRepository.create(createRentDto);
    return this.rentRepository.save(rent);
  }

  async findAll(): Promise<Rent[]> {
    return this.rentRepository.find({ relations: ['book', 'user'] });
  }

  async findOne(id: number): Promise<Rent> {
    return this.rentRepository.findOne({ where: { id }, relations: ['book', 'user'] });
  }

  async update(id: number, updateRentDto: UpdateRentDto): Promise<Rent> {
    await this.rentRepository.update(id, updateRentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rentRepository.delete(id);
  }
}
