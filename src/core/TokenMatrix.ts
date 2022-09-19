import { Token } from './Token';

export class TokenMatrix {
  private _matrix: Token[][];
  private _lineStartPadding: number;

  constructor(lines: Token[][]) {
    this._matrix = lines;
    this._lineStartPadding = 0;
  }

  get matrix() {
    return this._matrix;
  }

  setLineStartPadding(length: number): void {
    if (length < 0) {
      throw new Error('length must be a greater than 0');
    }
    this._lineStartPadding = length;
  }

  getRow(idx: number): Token[] {
    this.isValidRowIdx(idx);
    return this._matrix[idx];
  }

  getColumn(idx: number): Token[] {
    return this._matrix.map((row) => row?.[idx]);
  }

  /**
   * return the sum of all the tokens' length of a row
   *
   * return value -1 mean that this is weightless
   *
   * @param rowIdx the row number, should be in the matrix range
   */
  getRowWeight(rowIdx: number): number {
    this.isValidRowIdx(rowIdx);
    const row = this.getRow(rowIdx);
    if (row.length === 1 && row[0].value === '') {
      return -1;
    }
    return row.reduce((acc, t) => acc + t.weight, 0);
  }

  getShortestRow(): number {
    let smallestRowWeight = Infinity;
    let smallestRowIndex = 0;
    for (let i = 0; i < this._matrix.length; i++) {
      const currRowWeight = this.getRowWeight(i);
      if (currRowWeight < 0) {
        continue;
      }
      if (currRowWeight < smallestRowWeight) {
        smallestRowIndex = i;
        smallestRowWeight = currRowWeight;
      }
    }

    return smallestRowIndex;
  }

  transformRow(rowIdx: number, fn: (v: string, i: number, arr: Token[]) => string): void {
    this.isValidRowIdx(rowIdx);
    this.getRow(rowIdx).forEach((t, i, arr) => t.transform((v) => fn(v, i, arr)));
  }

  transformColumn(colIdx: number, fn: (v: string, i: number, arr: Token[]) => string): void {
    this.getColumn(colIdx).forEach((t, i, arr) => t?.transform((v) => fn(v, i, arr)));
  }

  getLongestTokenOfColumn(colIdx: number): Token {
    return this.getColumn(colIdx).sort((t1, t2) => t2.weight - t1.weight)[0];
  }

  isValidRowIdx(idx: number) {
    if (idx >= this._matrix.length || idx < 0) {
      throw new Error('Row Index must be in range of matrix');
    }
  }

  toString(): string {
    return this._matrix
      .map((row) => row.map((token) => token.value).join(' '))
      .map((line) => ' '.repeat(this._lineStartPadding) + line)
      .join('\n');
  }
}
