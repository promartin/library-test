import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from './entities/rent.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Employee } from 'src/decorators/roles.decorator';

ApiTags('Rents')
@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Employee(true)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creating rent, only employees can do that.' })
  @ApiResponse({ status: 200, description: 'Rent created.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  create(@Body() createRentDto: CreateRentDto): Promise<Rent> {
    return this.rentService.create(createRentDto);
  }

  /*
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
  */
}
