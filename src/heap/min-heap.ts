class TreeNode<T> {
    left: NullableNode<T>;
    right: NullableNode<T>;
    value: T;

    constructor(value: T, leftNode?: TreeNode<T>, rightNode?: TreeNode<T>) {
        this.value = value;
        this.left = leftNode ?? null;
        this.right = rightNode ?? null;
    }
}

type NullableNode<T> = TreeNode<T> | null;

/**
 * 
 * @description 最小堆
 * @link https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/heap
 * @link https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65
 * @export
 * @class MinHeap
 * @template T
 */
export class MinHeap<T> {
    private root: NullableNode<T>;

    constructor() {
        this.root = null;
    }

    add(value: T): this {
        if (!this.root) {
            this.root = new TreeNode(value);
        }
        
        return this;
    }

    remove(value: T) {

    }

    poll() {

    }

    peek() {

    }

    isEmpty() {

    }

    toString() {

    }
}