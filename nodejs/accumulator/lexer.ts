enum TokenEnum {
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    MUL = 'MUL',
    DIV = 'DIV',
    NUM = 'NUM',
    LEFT_BRACKET = 'LEFT_BRACKET',
    RIGHT_BRACKET = 'RIGHT_BRACKET',
    EOF = 'EOF',
}

class Token {
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
    private _advance() {
        this._position++;
    }
    private _parseNum() {
        let n = this._text[this._position];
        while(/^\d$/.test(this._text[this._position + 1] || '')) {
            this._advance();
            n += this._text[this._position];
        }
        return parseInt(n);
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
        } else if(/^\d+$/.test(char)) {
            token = new Token(TokenEnum.NUM, this._parseNum());
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
    }
}