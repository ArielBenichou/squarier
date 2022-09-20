import { Parser } from './Parser';

describe('Parser', () => {
  it('should parse string to TokenMatrix', () => {
    const parser = new Parser();
    const tm = parser.parse('const a = 5;\nlet b = "name"');

    expect(tm.toString()).toBe('const a = 5;\nlet b = "name"');
  });
});
