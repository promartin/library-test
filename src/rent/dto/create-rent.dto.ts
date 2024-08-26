import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRentDto {
  @ApiProperty({
    description: "The ID of the book",
    example: 6
  })
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty({
    description: "The ID of the book",
    example: "1"
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: "The date of the rent",
    example: "2024-10-09"
  })
  @IsNotEmpty()
  @IsDateString()
  rentalDate: string;

  @ApiProperty({
    description: "The date when the user returns the book",
    example: "2024-11-01"
  })
  @IsNotEmpty()
  @IsDateString()
  returnDate: string;
}
