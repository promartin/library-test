export class CreateBookDto {

  @IsNotEmpty()
  title: string;
  author: string;
  publishedAt: number;
}
