import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(128)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string | null;
}
