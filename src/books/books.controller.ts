import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Public } from 'src/decorators/auth.decorator';
import { Employee } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Employee(true)
  @ApiOperation({ summary: 'Adding new book, only employees can do that' })
  @ApiResponse({ status: 201, description: 'Book created successfully.' })
  @ApiResponse({ status: 400, description: "Didn't meet criteria." })
  @ApiBearerAuth()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Returning all books.' })
  @ApiResponse({ status: 200, description: 'Successfuly returned all books.' })
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Returning a book' })
  @ApiResponse({ status: 200, description: 'Successfuly returned book.' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Employee(true)
  @ApiOperation({ summary: 'Updating a book, only employees can do that.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Employee(true)
  @ApiOperation({ summary: 'Deleting a book, only employees can do that.' })
  @ApiResponse({ status: 200, description: 'Successfuly removed book.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.booksService.removeBook(+id);
  }
}
