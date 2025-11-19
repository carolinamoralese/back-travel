import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('login → debe llamar validateUser y login', async () => {
    const dto = { email: 'test@mail.com', password: '123456' };
    const user = { id: 1, email: dto.email };

    mockAuthService.validateUser.mockResolvedValue(user);
    mockAuthService.login.mockResolvedValue({ access_token: 'token123' });

    const result = await controller.login(dto);

    expect(mockAuthService.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    expect(mockAuthService.login).toHaveBeenCalledWith(user);
    expect(result).toEqual({ access_token: 'token123' });
  });

  it('register → debe llamar al servicio y devolver el usuario creado', async () => {
    const dto = { email: 'new@mail.com', password: '123456', roleId: 1 };

    mockAuthService.register.mockResolvedValue({
      id: 10,
      ...dto,
    });

    const result = await controller.register(dto);

    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(10);
  });
});
