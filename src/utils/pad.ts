type PadOptions = {
  /**
   * the symbol to pad the string with
   */
  symbol: string;
  /**
   * pad mode `before`, `after` or `balanced`.
   */
  mode: 'after' | 'before' | 'balanced';

  /**
   * if true add padding up to `len`.
   *
   * e.g.
   *
   * `pad("ariel", 7, {symbol: '_', include: true, mode: 'after'})` => `"ariel__"` (only 2 symbol added)
   *
   * `pad("ariel", 7, {symbol: '_', include: false, mode:'after'})` => `"ariel_______"` (all 7 symbol added)
   *
   */
  include: boolean;
};

function pad(str: string, len: number, options?: Partial<PadOptions>) {
  const { symbol, mode, include } = getDefault(options || {});

  if (mode !== 'after') {
    throw new Error(`'${mode}' mode is not implemented yet`);
  }

  if (include === false) {
    throw new Error(`'false' include is not implemented yet`);
  }

  const paddingLength = Math.max(len - str.length, 0);
  return str + symbol.repeat(paddingLength);
}

function getDefault(options: Partial<PadOptions>): PadOptions {
  return {
    include: options.include ?? true,
    mode: options.mode ?? 'after',
    symbol: options.symbol ?? ' ',
  };
}

export default pad;
