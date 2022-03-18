import Lexer from './lexer';
import Syntax from './syntax';

const text = process.argv.slice(2).join(' ');
console.log('lexer', process.argv, text);

const lexer = new Lexer(text);
const tokens = lexer.parse();
const syntax = new Syntax(tokens);
const result = syntax.parse();
console.log('syntax', result);