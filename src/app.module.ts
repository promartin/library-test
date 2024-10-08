import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BooksModule,
    AuthModule,
    UsersModule,
    RentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
