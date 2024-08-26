import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @ApiProperty({
    description: "The title of the book",
    example: "Lord of the Rings"
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "The author of the book",
    example: "J.R.R. Tolkein"
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: "The year, when the book was published",
    example: "1954"
  })
  @IsAlphanumeric()
  publishedAt: number;
}
