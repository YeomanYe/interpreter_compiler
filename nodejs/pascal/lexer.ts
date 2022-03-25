export enum TokenEnum {
    // 符号
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    MUL = 'MUL',
    DIV = 'DIV',
    NUM = 'NUM',
    LEFT_BRACKET = 'LEFT_BRACKET', // 左括号
    RIGHT_BRACKET = 'RIGHT_BRACKET', // 右括号
    SEMI = 'SEMI', // 分号
    COLON = 'COLON', //冒号
    DOT = 'DOT', //句号
    COMMA = 'COMMA', // 逗号
    ASSIGN = 'ASSIGN', // 分配运算符
    // 关键字
    PROGRAM = 'PROGRAM',
    PROCEDURE = 'PROCEDURE',
    VAR = 'VAR',
    BEGIN = 'BEGIN',
    END = 'END',
    WHILE = 'WHILE',
    DO = 'DO',
    IF = 'IF',
    THEN = 'THEN',
    // 特殊标记
    ID = 'ID', 
    EOF = 'EOF',
}

const KEYWORD_SET = new Set<string>([
    TokenEnum.PROGRAM,
    TokenEnum.PROCEDURE,
    TokenEnum.VAR,
    TokenEnum.BEGIN,
    TokenEnum.END,
    TokenEnum.WHILE,
    TokenEnum.DO,
    TokenEnum.IF,
    TokenEnum.THEN,
])

export class Token {
    public type: TokenEnum;
    public value: string;
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

export default class Lexer {
    private readonly _text;
    private _position: number;
    private _tokens: Token[];
    constructor(text) {
        this._text = text;
        this._position = 0;
        this._tokens = [];
    }
    private _skipWhitespace() {
        while(/^\s+$/.test(this._text[this._position])) {
            this._advance();
        }
    }
    // 以当前
    private _offset(n: number = 0) {
        return this._text[this._position + n];
    }
    private _advance() {
        this._position++;
    }
    private _parseNum() {
        let n = this._offset();
        while(/^\d$/.test(this._offset(1) || '')) {
            this._advance();
            n += this._offset();
        }
        return parseInt(n);
    }
    private _parseKeyword() {
        let w: string = this._offset();
        while(/^\w$/.test(this._offset(1) || '')) {
            this._advance();
            w += this._offset();
        }
        if (KEYWORD_SET.has(w.toUpperCase())) {
            return new Token(w.toUpperCase, w);
        }
        return new Token(TokenEnum.ID, w);
    }
    private _getNextToken() {
        let token;
        if (this._text.length <= this._position) {
            token = new Token(TokenEnum.EOF, 'eof');
        } else {
            this._skipWhitespace();
        }
        let char = this._text[this._position];
        if (char === '+') {
            token = new Token(TokenEnum.PLUS, '+');
        } else if(char === '-') {
            token = new Token(TokenEnum.MINUS, '-');
        } else if(char === '*') {
            token = new Token(TokenEnum.MUL, '*');
        } else if(char === '/') {
            token = new Token(TokenEnum.DIV, '/');
        } else if(char === '(') {
            token = new Token(TokenEnum.LEFT_BRACKET, '(');
        } else if(char === ')') {
            token = new Token(TokenEnum.RIGHT_BRACKET, ')');
        } else if(char === ';') {
            token = new Token(TokenEnum.SEMI, ';');
        } else if (char === '.') {
            token = new Token(TokenEnum.DOT, '.');
        } else if (char === ':' && this._offset(1) === '=') {
            token = new Token(TokenEnum.ASSIGN, ':=');
            this._advance();
        } else if (char === ':') {
            token = new Token(TokenEnum.COLON, ':');
        } else if (char === ',') {
            token = new Token(TokenEnum.COMMA, ',');
        } else if(/^\d+$/.test(char)) {
            token = new Token(TokenEnum.NUM, this._parseNum());
        } else if(/^[\w]+$/.test(char)) {
            token = this._parseKeyword();
        }
        this._advance();
        if (!token) {
            throw new Error('lexer error position:' + this._position)
        }
        return token;
    }
    parse() {
        let token
        do {
            token = this._getNextToken();
            this._tokens.push(token);
        } while(token?.type !== TokenEnum.EOF)
        console.log('lexer parse', this._tokens);
        return this._tokens;
    }
}