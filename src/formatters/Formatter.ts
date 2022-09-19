import { Parser } from '../parsers/Parser';
import pad from '../utils/pad';

type FormatOptions = {
  language: 'ts' | 'js';
};

export class Formatter {
  private _options: FormatOptions;

  constructor(options: FormatOptions) {
    this._options = options;
  }

  format(selection: string) {
    const parser = new Parser();
    const tm = parser.parse(selection);
    const shortestRow = tm.getShortestRow();

    const shortestRowLength = tm.getRow(shortestRow).length;

    for (let col = 0; col < shortestRowLength; col++) {
      const paddingLen = tm.getLongestTokenOfColumn(col).weight;

      tm.transformColumn(col, (v, i, arr) => (tm.getRow(i).length - 1 === col || v === '' ? v : pad(v, paddingLen)));
    }
    return tm.toString();
  }
}
