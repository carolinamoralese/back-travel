import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Carolina Morales',
    description: 'Nombre completo del usuario',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'caro@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  @ApiProperty({
    example: 'caro@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID del rol asignado al usuario' })
  roleId: number;
}
