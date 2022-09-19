import { Token } from './Token';

describe('Token', () => {
  describe('value', () => {
    it('should be the same as passed in the constructor', () => {
      const str = 'test';
      const token = new Token(str);

      expect(token.value).toBe(str);
    });
  });

  describe('length', () => {
    it('should have the string length for a normal string', () => {
      const str = 'a string';
      const token = new Token(str);

      expect(token.weight).toBe(str.length);
    });
  });

  describe('transform', () => {
    it('should change the value of the token', () => {
      const fn = (v: string) => '@' + v + '@';
      const t = new Token('string');
      t.transform(fn);
      expect(t.value).toBe('@string@');
    });
  });
});
