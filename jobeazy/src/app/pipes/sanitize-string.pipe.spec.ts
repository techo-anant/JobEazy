import { SanitizeStringPipe } from './sanitize-string.pipe';

describe('SanitizeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
