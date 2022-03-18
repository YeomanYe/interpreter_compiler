import {Token, TokenEnum} from './lexer';
export default class Syntax {
    
    private _position: number = 0;
    constructor(private readonly _token: Token[]) {
        
    }
    private _error(token: Token) {
        throw new Error('syntax error, token.type:' + token.type + ',token.value:' + token.value)
    }
    private _eat(type: TokenEnum) {
        const token = this._token[this._position]
        try {
            if (this._token[this._position].type === type) {
                this._position++;
            } else {
                this._error(token);
            }
        } catch (error) {
            this._error(token);
            console.error(error);
        }
        return this._token[this._position];
    }
    private _peek() {
        return this._token[this._position];
    }
    private _parseFactor() {
        let token = this._token[this._position];
        let result;
        if (token.type === TokenEnum.LEFT_BRACKET) {
            this._eat(TokenEnum.LEFT_BRACKET);
            result = this._parseAdd();
            this._eat(TokenEnum.RIGHT_BRACKET);
        } else if (token.type === TokenEnum.NUM) {
            this._eat(TokenEnum.NUM);
            result = parseInt(token.value, 10);
        }
        return result;
    }
    private _parseMul() {
        let result = this._parseFactor();
        let token = this._peek();
        while (token.type === TokenEnum.MUL || token.type === TokenEnum.DIV) {
            if (token.type === TokenEnum.MUL) {
                this._eat(TokenEnum.MUL);
                result *= this._parseFactor();
            } else if(token.type === TokenEnum.DIV) {
                this._eat(TokenEnum.DIV);
                result /= this._parseFactor();
            }
            token = this._peek();
        }
        return result;
    }
    // 解析
    private _parseAdd() {
        let result = this._parseMul();
        let token = this._peek();
        while (token.type === TokenEnum.PLUS || token.type === TokenEnum.MINUS) {
            if (token.type === TokenEnum.PLUS) {
                this._eat(TokenEnum.PLUS);
                result += this._parseMul();
            } else if(token.type === TokenEnum.MINUS) {
                this._eat(TokenEnum.MINUS);
                result -= this._parseMul();
            }
            token = this._peek();
        }
        return result;
    }
    parse() {
        return this._parseAdd();
    }
}