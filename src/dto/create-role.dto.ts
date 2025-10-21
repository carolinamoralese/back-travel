import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol que se va a crear',
    example: 'admin',
  })
  @IsString()
  name: string;
}
