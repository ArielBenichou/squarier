export type TokenTransformFn = (value: string) => string;

export class Token {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  get weight() {
    if (this._value.slice(0, 2) === '//') {
      return 0;
    }

    return this._value.length;
  }

  transform(fn: TokenTransformFn): void {
    this._value = fn(this._value);
  }

  toString() {
    return `value: '${this.value}'; weight: ${this.weight}`;
  }
}
