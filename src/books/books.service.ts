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

    return this.bookRepository.insert(newBook)
  }

  findAllBooks() {
    return this.bookRepository.find()
  }

  findOne(id: number) {
    return this.bookRepository.findBy({ id: id })
  }

  updateBook(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ id: id, }, { ...updateBookDto })
  }

  removeBook(id: number) {
    return this.bookRepository.delete({ id: id });
  }
}
