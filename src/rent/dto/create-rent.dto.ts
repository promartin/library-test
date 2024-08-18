import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRentDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDateString()
  rentalDate: string;

  @IsNotEmpty()
  @IsDateString()
  returnDate: string;
}
