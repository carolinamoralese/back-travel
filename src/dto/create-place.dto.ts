import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty({
    description: 'Nombre del lugar',
    example: 'Paris',
  })
  @IsString()
  name: string;

  @IsInt()
  userId: number;
}
