import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Public } from 'src/decorators/auth.decorator';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ) { }

  private readonly books: Book[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      publishedAt: 1949,
    },
    {
      id: 2,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      publishedAt: 1932,
    },
    {
      id: 3,
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      publishedAt: 1953,
    },
    {
      id: 4,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publishedAt: 1951,
    },
    {
      id: 5,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedAt: 1960,
    },
  ];

  createBook(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto)

    return this.bookRepository.insert(newBook)
  }

  findAllBooks() {
    return this.bookRepository.find()
  }

  findOneBook(id: number) {
    return this.bookRepository.findBy({ id: id })
  }

  updateBook(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ id: id, }, { ...updateBookDto })
  }

  removeBook(id: number) {
    return this.bookRepository.delete({ id: id });
  }
}
