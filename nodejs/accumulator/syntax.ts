import {Token, TokenEnum} from './lexer';

export abstract class Node {
    abstract name;
    constructor() {
        
    }
}

class BinaryOperator extends Node {
    readonly name = 'binary';
    constructor(readonly left, readonly right, readonly op) {
        super();
    }
}

class UnaryOperator extends Node {
    readonly name = 'unary';
    constructor(readonly op, readonly value) {
        super();
    }
}

class Factory extends Node {
    readonly name = 'factory';
    value: number;
    constructor(readonly token) {
        super();
        this.value = token.value;
    }
}

export default class Syntax {
    
    private _position: number = 0;
    constructor(private readonly _tokens: Token[]) {
        
    }
    get token() {
        return this._tokens[this._position];
    }
    private _error(token: Token) {
        throw new Error('syntax error, token.type:' + token.type + ',token.value:' + token.value)
    }
    private _eat(type: TokenEnum) {
        const token = this.token;
        try {
            if (this.token.type === type) {
                this._position++;
            } else {
                this._error(token);
            }
        } catch (error) {
            this._error(token);
            console.error(error);
        }
        return this.token;
    }
    private _parseFactor() {
        let token = this.token;
        let result;
        if (token.type === TokenEnum.LEFT_BRACKET) {
            this._eat(TokenEnum.LEFT_BRACKET);
            result = this._parseAdd();
            this._eat(TokenEnum.RIGHT_BRACKET);
        } else if (token.type === TokenEnum.NUM) {
            this._eat(TokenEnum.NUM);
            result = new Factory(token);
        } else if (token.type === TokenEnum.PLUS) {
            this._eat(TokenEnum.PLUS);
            result = new UnaryOperator(token, this._parseFactor());
        } else if (token.type === TokenEnum.MINUS) {
            this._eat(TokenEnum.MINUS);
            result = new UnaryOperator(token, this._parseFactor());
        }
        return result;
    }
    private _parseMul() {
        let left = this._parseFactor();
        while (this.token.type === TokenEnum.MUL || this.token.type === TokenEnum.DIV) {
            let right, op;
            if (this.token.type === TokenEnum.MUL) {
                op = this.token;
                this._eat(TokenEnum.MUL);
                right = this._parseFactor();
            } else if(this.token.type === TokenEnum.DIV) {
                op = this.token;
                this._eat(TokenEnum.DIV);
                right = this._parseFactor();
            }
            left = new BinaryOperator(left, right, op)
        }
        return left;
    }
    // 解析
    private _parseAdd() {
        let left = this._parseMul();
        while (this.token.type === TokenEnum.PLUS || this.token.type === TokenEnum.MINUS) {
            let op, right;
            if (this.token.type === TokenEnum.PLUS) {
                op = this.token;
                this._eat(TokenEnum.PLUS);
                right = this._parseMul();
            } else if(this.token.type === TokenEnum.MINUS) {
                op = this.token;
                this._eat(TokenEnum.MINUS);
                right = this._parseMul();
            }
            left = new BinaryOperator(left, right, op);
        }
        console.log(left, this._position);
        return left;
    }
    parse() {
        return this._parseAdd();
    }
}