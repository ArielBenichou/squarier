import { Parser } from '../parsers/Parser';
import { TokenMatrix } from './TokenMatrix';

describe('TokenMatrix', () => {
  let parser: Parser;

  beforeAll(() => {
    parser = new Parser();
  });

  describe('getColumn', () => {
    it('should return the specified column', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      expect(matrix.getColumn(0).map((t) => t.value)).toStrictEqual(['const', 'let']);
    });

    it('should return the undefined if out of column', () => {
      const matrix = parser.parse('const a = 5;\n\nlet b = 6;\nb;\n');
      expect(matrix.getColumn(1).map((t) => t?.value)).toStrictEqual([
        'a',
        undefined,
        'b',
        undefined,
        undefined,
      ]);
    });
  });

  describe('getShortestRow', () => {
    it('should return the shortest row', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      expect(matrix.getShortestRow()).toBe(1);
    });

    it('should ignore empty lines', () => {
      const matrix = parser.parse('\n\n\nconst a = 5;\n\nlet b = 6;\n\n');
      const shortest = matrix.getShortestRow();

      expect(shortest).toBe(5);
    });
  });

  describe('getLongestTokenOfColumn', () => {
    it('should return the longest token of the column', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      expect(matrix.getLongestTokenOfColumn(0).value).toBe('const');
    });
  });

  describe('getRowWeight', () => {
    it('should return the sum of all the tokens length property', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      expect(matrix.getRowWeight(0)).toBe(9);
      expect(matrix.getRowWeight(1)).toBe(7);
    });

    it('should return -1 for empty row', () => {
      const matrix = parser.parse('\nconst a = 5;\nlet b = 6;');
      expect(matrix.getRowWeight(0)).toBe(-1);
    });

    it('should throw an error if accessing a row out of bounds', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      expect(() => matrix.getRowWeight(7)).toThrowError();
      expect(() => matrix.getRowWeight(-8)).toThrowError();
    });
  });

  describe('transformRow', () => {
    it('should inject the correct v,i, and arr', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      const a = ['const', 'a', '=', '5;'];
      let counter = 0;
      matrix.transformRow(0, (v, i, arr) => {
        expect(v).toBe(a[counter]);
        expect(i).toBe(counter);
        expect(arr.map((el) => el.value)).toStrictEqual(a);
        counter++;
        return v;
      });
    });

    it("should apply the transform to the row's token", () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      matrix.transformRow(0, (v) => v + '@');
      expect(
        matrix
          .getRow(0)
          .map((t) => t.value)
          .join(' '),
      ).toBe('const@ a@ =@ 5;@');
    });
  });

  describe('transformColumn', () => {
    it('should inject the correct v,i, and arr', () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      const a = ['const', 'let'];
      let counter = 0;
      matrix.transformColumn(0, (v, i, arr) => {
        expect(v).toBe(a[counter]);
        expect(i).toBe(counter);
        expect(arr.map((el) => el.value)).toStrictEqual(a);
        counter++;
        return v;
      });
    });

    it("should apply the transform to the column's token", () => {
      const matrix = parser.parse('const a = 5;\nlet b = 6;');
      matrix.transformColumn(0, (v) => v + '@');
      expect(
        matrix
          .getColumn(0)
          .map((t) => t.value)
          .join(' '),
      ).toBe('const@ let@');
    });
  });
});
