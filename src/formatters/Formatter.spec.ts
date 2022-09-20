import { Formatter } from './Formatter';

describe('format', () => {
  let formatter: Formatter;
  beforeAll(() => {
    formatter = new Formatter({ language: 'js' });
  });

  it('should return an empty string if given an empty string', () => {
    const selection = ``;

    const formatted = formatter.format(selection);

    const expected = ``;
    expect(formatted).toBe(expected);
  });

  it('should return squared up text', () => {
    const selection = `const first = "string";
let s = 5;`;

    const formatted = formatter.format(selection);

    const expected = `const first = "string";
let   s     = 5;`;
    expect(formatted).toBe(expected);
  });

  it('should not square up text in a double quote string', () => {
    const selection = `const first = "this is a multi word double quote string";
let s = "this is another one";`;

    const formatted = formatter.format(selection);

    const expected = `const first = "this is a multi word double quote string";
let   s     = "this is another one";`;
    expect(formatted).toBe(expected);
  });

  it('should ignore empty lines', () => {
    const selection = `
const first = "string";

let s = 5;
`;

    const formatted = formatter.format(selection);

    const expected = `
const first = "string";

let   s     = 5;
`;
    expect(formatted).toBe(expected);
  });

  it('should work with uneven lines length', () => {
    const selection = `This has space
and this has one`;

    const formatted = formatter.format(selection);

    const expected = `This has  space
and  this has   one`;
    expect(formatted).toBe(expected);
  });

  it('should keep the space before the start of the line', () => {
    const selection = `  This has space
 and this has one`;

    const formatted = formatter.format(selection);

    const expected = `  This has  space
  and  this has   one`;
    expect(formatted).toBe(expected);
  });

  it('should behave to lines with // comments as if were one token', () => {
    const selection = `            // APIs
            '/api/config' => 'BK_GLOBAL_Config',
    // This is another comment
            '/api/user' => 'BK_GLOBAL_User',    // Inline Comment
            '/api/clients' => 'BK_GLOBAL_Clients',`;

    const formatted = formatter.format(selection);

    const expected = `            // APIs
            '/api/config'  => 'BK_GLOBAL_Config',
            // This is another comment
            '/api/user'    => 'BK_GLOBAL_User', // Inline Comment
            '/api/clients' => 'BK_GLOBAL_Clients',`;
    expect(formatted).toBe(expected);
  });

  it('should handle tabs as a single white space', () => {
    // in the string below we have tabs
    const selection = `first line =>   	 other end,
second line 		=> 		   	  2nd endofline,`;

    const formatted = formatter.format(selection);

    const expected = `first  line => other end,
second line => 2nd   endofline,`;
    expect(formatted).toBe(expected);
  });

  it("should remove spaces at the end of lines", () => {

    const selection = `const a = 5;
let b = 567;   `;

    const formatted = formatter.format(selection);

    const expected = `const a = 5;
let   b = 567;`;
    expect(formatted).toBe(expected);
  })
});
