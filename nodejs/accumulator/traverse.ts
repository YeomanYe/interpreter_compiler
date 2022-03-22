class AbstractSyntaxTreeTraverse {
    constructor(readonly treeNode) {
        
    }
    parseNode(node) {
        return this['_parse_'+node.name](node);
    }
}
/**
 * 抽象语法树遍历
 */
export default class Interpreter extends AbstractSyntaxTreeTraverse{
    constructor(readonly treeNode, readonly visitor = {}) {
        super(treeNode);
    }
    _parse_binary(node) {
        const left = this.parseNode(node.left);
        const right = this.parseNode(node.right);
        let result;
        switch (node.op.value) {
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case '*':
                result = left * right;
                break;
            case '/':
                result = left / right;
                break;
        }
        return result;
    }
    _parse_factory(node) {
        return node.value;
    }

    parse() {
        return this.parseNode(this.treeNode);
    }
}