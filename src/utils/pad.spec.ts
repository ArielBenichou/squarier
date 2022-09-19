import pad from './pad';

describe('pad', () => {
  describe('un-impleamented', () => {
    it('should throw error if using "after" or "balanced" mode', () => {
      expect(() => pad('abc', 5, { mode: 'balanced' })).toThrowError();
      expect(() => pad('abc', 5, { mode: 'before' })).toThrowError();
    });

    it('should throw error if using "false" include', () => {
      expect(() => pad('abc', 5, { include: false })).toThrowError();
    });
  });

  it('should have default options if none or partially given', () => {
    expect(pad('abc', 5)).toBe('abc  ');
    expect(pad('abc', 5, {})).toBe('abc  ');
    expect(pad('abc', 5, { symbol: '#' })).toBe('abc##');
  });

  it('should add symbols after the words', () => {
    expect(pad('abc', 7)).toBe('abc    ');
    expect(pad('longtext', 9)).toBe('longtext ');
    expect(pad('two word', 10)).toBe('two word  ');
    expect(pad('two word', 10, { symbol: '*' })).toBe('two word**');
  });

  it('should not add padding if the word length exceed the padding length', () => {
    expect(pad('this is enough', 14, { include: true })).toBe('this is enough');
  });
});
