import { Roles } from './roles.decorator';

describe('Roles Decorator', () => {
  it('debería crear metadata correctamente', () => {
    const decorator = Roles('Admin');
    expect(typeof decorator).toBe('function');
  });
});
