import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('debería estar definido', () => {
    const guard = new JwtAuthGuard();
    expect(guard).toBeDefined();
  });
});
