import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  it('debería definirse correctamente', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });
});
