from spi import NodeVisitor, Parser, Lexer, PLUS, MINUS, MUL, DIV

class RPNInterpreter(NodeVisitor):
    def __init__(self, parser):
        self.parser = parser

    def visit_BinOp(self, node):
        op = ''
        if node.op.type == PLUS:
            op = '+'
        elif node.op.type == MINUS:
            op = '-'
        elif node.op.type == MUL:
            op = '*'
        elif node.op.type == DIV:
            op = '/'
        return str(self.visit(node.left)) + ' ' + str(self.visit(node.right)) + ' ' + op

    def visit_Num(self, node):
        return node.value

    def interpret(self):
        tree = self.parser.parse()
        return self.visit(tree)

class LispInterpreter(NodeVisitor):
    def __init__(self, parser):
        self.parser = parser

    def visit_BinOp(self, node):
        op = ''
        if node.op.type == PLUS:
            op = '+'
        elif node.op.type == MINUS:
            op = '-'
        elif node.op.type == MUL:
            op = '*'
        elif node.op.type == DIV:
            op = '/'
        return '(' + op + str(self.visit(node.left)) + ' ' + str(self.visit(node.right)) + ')'

    def visit_Num(self, node):
        return node.value

    def interpret(self):
        tree = self.parser.parse()
        return self.visit(tree)

def main():
    while True:
        try:
            try:
                text = raw_input('v6> ')
            except NameError:  # Python3
                text = input('v6> ')
        except EOFError:
            break
        if not text:
            continue

        lexer = Lexer(text)
        parser = Parser(lexer)
        interpreter = RPNInterpreter(parser)
        result = interpreter.interpret()
        print('RPN: ' + result)
        lexer = Lexer(text)
        parser = Parser(lexer)
        interpreter = LispInterpreter(parser)
        result = interpreter.interpret()
        print('Lisp: ' + result)


if __name__ == '__main__':
    main()