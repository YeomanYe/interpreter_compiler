import Lexer from './lexer';
import Syntax from './syntax';
import Interpreter from './interpreter';
import Traverse from './traverse';

const text = process.argv.slice(2).join(' ');
console.log('lexer', process.argv, text);

const lexer = new Lexer(text);
const tokens = lexer.parse();
const syntax = new Syntax(tokens);
const ast = syntax.parse();
console.log('syntax', ast);
const tst = new Traverse(ast, new Interpreter());
const res = tst.parse();
console.log('ast traverse result', res);
