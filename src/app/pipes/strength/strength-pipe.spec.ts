import { StrengthPipe } from './strength-pipe';

describe('strength pipe:', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  });
  it('transform function: should return weak when passing 9', () => {
    expect(pipe.transform(9)).toContain('weak');
  });
  it('transform function: should return strong when passing 11', () => {
    expect(pipe.transform(11)).toContain('strong');
  });
});
