import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';
import { Public } from 'src/decorators/auth.decorator';

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Post()
  create(@Body() createRentDto: CreateRentDto): Promise<Rent> {
    return this.rentService.create(createRentDto);
  }

  @Get()
  @Public()
  findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: number): Promise<Rent> {
    return this.rentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRentDto: UpdateRentDto): Promise<Rent> {
    return this.rentService.update(id, updateRentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rentService.remove(id);
  }
}
