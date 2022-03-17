import Lexer from './lexer';

const text = process.argv.slice(2).join(' ');
console.log('lexer', process.argv, text);

const lexer = new Lexer(text);
lexer.parse();