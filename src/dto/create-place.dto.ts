import { IsString, IsInt } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsInt()
  userId: number;
}
