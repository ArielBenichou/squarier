import { Token } from "./Token";
import { TokenLine } from "./TokenLine";

export function formatSelection(text: string): string {
  if (!text) {
    return "";
  }

  const lines = text.split("\n");
  const leftSpacesCount = countSpacesBeforeFirstWord(lines[0]);
  const tokensLines = lines.map((line) => parseTokens(line));

  const shortestLine = tokensLines.map((line) => line.length).sort()[0];
  const maxWordLength = Array(shortestLine)
    .fill(null)
    .map((_, i) => getLongestTokenOfColumn(tokensLines, i));
  const paddedTokens = tokensLines.map((line) =>
    line.tokens.map((el, i, arr) =>
      i < maxWordLength.length && i !== arr.length - 1
        ? pad(el.value, maxWordLength[i])
        : el.value
    )
  );
  return paddedTokens
    .map((wordLine) => pad("", leftSpacesCount) + wordLine.join(" "))
    .join("\n");
}

/**
 * Return a array of token,
 * takes into account string and string escape characters
 */
function parseTokens(line: string): TokenLine {
  const tokens: Token[] = [];
  let tmp = "";
  let isInString = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const prevCh = line[i - 1];
    const nextCh = line[i + 1];
    if (!isInString && ch === "/" && nextCh === "/") {
      // This mean we are a comment, and we all the comment should be one token
      // till the end of the line
      if (tmp) {
        tokens.push(new Token(tmp));
      }
      const comment = line.slice(i);
      tokens.push(new Token(comment, 0));
      return new TokenLine(tokens);
    }
    // If we not in a double quote string, we should treat white space as separators
    if (ch === " " && !isInString) {
      if (tmp) {
        tokens.push(new Token(tmp));
      }
      tmp = "";
    } else {
      if (ch === '"' && prevCh !== "\\") {
        isInString = !isInString;
      }
      tmp += ch;
    }
  }
  tokens.push(new Token(tmp));
  return new TokenLine(tokens);
}

function countSpacesBeforeFirstWord(line: string): number {
  return line.split("").findIndex((el) => el !== " ");
}

function getLongestTokenOfColumn(grid: TokenLine[], column: number): number {
  const lengths = grid.map((line) => line.tokens[column]?.length || 0);
  const sorted = lengths.sort((a, b) => b - a);
  return sorted[0] || 0;
}

function pad(str: string, n: number, symbol: string = " ") {
  const paddingLength = Math.max(n - str.length, 0);
  return str + symbol.repeat(paddingLength);
}
