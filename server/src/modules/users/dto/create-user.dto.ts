import { Roles } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsEnum(Roles)
  @IsOptional()
  roles?: Roles;
}
