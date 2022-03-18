import {Token, TokenEnum} from './lexer';
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
            result = parseInt(token.value, 10);
        }
        return result;
    }
    private _parseMul() {
        let result = this._parseFactor();
        while (this.token.type === TokenEnum.MUL || this.token.type === TokenEnum.DIV) {
            if (this.token.type === TokenEnum.MUL) {
                this._eat(TokenEnum.MUL);
                result *= this._parseFactor();
            } else if(this.token.type === TokenEnum.DIV) {
                this._eat(TokenEnum.DIV);
                result /= this._parseFactor();
            }
        }
        return result;
    }
    // 解析
    private _parseAdd() {
        let result = this._parseMul();
        while (this.token.type === TokenEnum.PLUS || this.token.type === TokenEnum.MINUS) {
            if (this.token.type === TokenEnum.PLUS) {
                this._eat(TokenEnum.PLUS);
                result += this._parseMul();
            } else if(this.token.type === TokenEnum.MINUS) {
                this._eat(TokenEnum.MINUS);
                result -= this._parseMul();
            }
        }
        return result;
    }
    parse() {
        return this._parseAdd();
    }
}