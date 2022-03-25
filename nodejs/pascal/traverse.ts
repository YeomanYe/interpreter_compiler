import { Node } from './syntax';
export default class AbstractSyntaxTreeTraverse {
    constructor(readonly treeNode, readonly visitor) {
        
    }
    parse(node: Node = this.treeNode) {
        let cloneNode = {...node};
        for(let k in cloneNode) {
            if (cloneNode.hasOwnProperty(k) && cloneNode[k] instanceof Node) {
                cloneNode[k] = this.parse(cloneNode[k]);
            }
        }
        let result = this.visitor['_parse_'+cloneNode.name](cloneNode);
        console.info(cloneNode.name, result);
        return result;
    }
}