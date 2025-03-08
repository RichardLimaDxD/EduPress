import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  description: string;

  @IsString()
  @IsOptional()
  image: string | null;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
