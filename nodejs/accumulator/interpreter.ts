
export default class InterpreterVisitor{
    _parse_unary(node) {
        const op = node.op;
        switch (op.value) {
            case '+':
                return node.value;
            case '-':
                return -node.value;
        }
    }
    _parse_binary(node) {
        const left = node.left;
        const right = node.right;
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
}