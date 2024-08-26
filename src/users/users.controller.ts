import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Employee } from 'src/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Registering new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: "Didn't meet criteria." })
  @ApiResponse({ status: 500, description: "User with this username exists." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Employee(false)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  @UseGuards(RolesGuard)
  @Employee(false)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one user' })
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Employee(false)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user data' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Employee(false)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
