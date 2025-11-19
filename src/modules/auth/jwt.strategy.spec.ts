import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    strategy = new JwtStrategy();
  });

  it('debería validar el payload correctamente', async () => {
    const payload = {
      sub: 1,
      username: 'test@mail.com',
      role: 'Admin',
    };

    const user = await strategy.validate(payload);

    expect(user).toEqual({
      userId: 1,
      email: 'test@mail.com',
      role: 'Admin',
    });
  });
});
