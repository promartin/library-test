import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public } from 'src/decorators/auth.decorator';
import { Employee } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Employee(true)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOneBook(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Employee(true)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Employee(true)
  remove(@Param('id') id: string) {
    return this.booksService.removeBook(+id);
  }
}
