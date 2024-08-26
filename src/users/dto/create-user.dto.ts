import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "The username of the user",
    example: "john.doe"
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password123"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: "The flag of the user, whatever the user is an employee or not",
    example: true
  })
  @IsNotEmpty()
  employee: boolean
}
