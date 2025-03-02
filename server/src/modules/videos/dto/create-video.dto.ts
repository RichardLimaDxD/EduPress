import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  video_url: string;
}
