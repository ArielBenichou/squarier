import { Token } from '../core/Token';
import { TokenMatrix } from '../core/TokenMatrix';

export class Parser {
  parse(str: string) {
    const rows = str.split('\n');
    const leftSpacesCount = this.countSpacesBeforeFirstWord(rows[0]);

    const matrix = rows.map((line) => this.parseLine(line));
    const tokenMatrix = new TokenMatrix(matrix);
    tokenMatrix.setLineStartPadding(leftSpacesCount);
    return tokenMatrix;
  }

  private countSpacesBeforeFirstWord(line: string): number {
    return Math.max(
      line.split('').findIndex((el) => el !== ' '),
      0,
    );
  }

  private convertTabsToOneSpace(str: string):string {
    return str.replace(/\t/g, " ");
  }

  /**
   * Return a array of token,
   * takes into account string and string escape characters
   */
  private parseLine(line: string): Token[] {
    line = this.convertTabsToOneSpace(line);
    const tokens: Token[] = [];
    let tmp = '';
    let isInString = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const prevCh = line[i - 1];
      const nextCh = line[i + 1];
      if (!isInString && ch === '/' && nextCh === '/') {
        // This mean we are a comment, and we all the comment should be one token
        // till the end of the line
        if (tmp) {
          tokens.push(new Token(tmp));
        }
        const comment = line.slice(i);
        tokens.push(new Token(comment));
        return tokens;
      }
      // If we not in a double quote string, we should treat white space as separators
      if (ch === ' ' && !isInString) {
        if (tmp) {
          tokens.push(new Token(tmp));
        }
        tmp = '';
      } else {
        if (ch === '"' && prevCh !== '\\') {
          isInString = !isInString;
        }
        tmp += ch;
      }
    }
    tokens.push(new Token(tmp));
    return tokens;
  }
}
