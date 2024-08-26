import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/decorators/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Employee } from 'src/decorators/roles.decorator';

ApiTags('User authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'You have to login, so you can authenticate yourself and do operations that require API Bearer' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Bad password.' })
  @ApiResponse({ status: 403, description: 'No user found with this username.' })
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto.username, userDto.password);
  }

  @Get('profile')
  @UseGuards(RolesGuard)
  @Employee(true)
  @ApiBearerAuth()
  @ApiOperation({ summary: "You get your profile's metadata" })
  @ApiResponse({ status: 200, description: 'Logged in.' })
  @ApiResponse({ status: 401, description: 'Logged out.' })
  getProfile(@Request() req) {
    return req.user;
  }
}
