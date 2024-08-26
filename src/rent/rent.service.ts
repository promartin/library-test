import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent) private rentRepository: Repository<Rent>,
    private readonly booksService: BooksService
  ) { }

  async create(createRentDto: CreateRentDto): Promise<Rent> {
    /*
    const { bookId, rentalDate, returnDate } = createRentDto;

    const isAvailable = await this.isBookAvailable(bookId, new Date(rentalDate), new Date(returnDate));
    if (!isAvailable) {
      throw new BadRequestException(`Book with ID ${bookId} is not available for the selected period.`);
    }
    */

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

  /*
  async isBookAvailable(bookId: number, rentalDate: Date, returnDate: Date): Promise<boolean> {
    console.log('Rental Date:', rentalDate);

    const conflictingRental = await this.rentRepository
      .createQueryBuilder('rent')
      .where('rent.bookId = :bookId', { bookId })
      .andWhere('rent.rentalDate < :returnDate', { returnDate })
      .andWhere('rent.returnDate > :rentalDate', { rentalDate })
      .getOne();

    return !conflictingRental;
  }
*/
}
