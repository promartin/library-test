import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) { }

  createBook(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto)

    return this.bookRepository.insert(newBook);
  }

  findAllBooks() {
    return `This action returns all books`;
  }

  findOneBook(id: number) {
    return `This action returns a #${id} book`;
  }

  updateBook(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  removeBook(id: number) {
    return `This action removes a #${id} book`;
  }
}
