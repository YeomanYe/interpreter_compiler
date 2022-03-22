import Lexer from './lexer';
import Syntax from './syntax';
import Interpreter from './traverse';

const text = process.argv.slice(2).join(' ');
console.log('lexer', process.argv, text);

const lexer = new Lexer(text);
const tokens = lexer.parse();
const syntax = new Syntax(tokens);
const ast = syntax.parse();
const tst = new Interpreter(ast);
const res = tst.parse();
console.log('syntax', ast);
console.log('ast traverse result', res);
