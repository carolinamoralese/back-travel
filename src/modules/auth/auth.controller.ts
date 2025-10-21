import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dto/create-users.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión con email y contraseña' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: '123456',
      },
    },
  })
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiBody({ type: CreateUserDTO })
  async register(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }
}
