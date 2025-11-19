import { Test } from '@nestjs/testing';
import { PlacesModule } from './places.module';

describe('PlacesModule', () => {
  it('debería cargarse correctamente', async () => {
    const module = await Test.createTestingModule({
      imports: [PlacesModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
