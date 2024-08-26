import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Book, User])],
  controllers: [RentController],
  providers: [RentService, BooksService],
})
export class RentModule { }
