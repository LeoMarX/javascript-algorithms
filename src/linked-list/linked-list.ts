
/**
 * @description 链表
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list/README.zh-CN.md
 */
import LinkedNode from './linked-node';

// interface LinkedNode<T = unknown> {
//     prev: LinkedNode<T> | null;
//     next: LinkedNode<T> | null;
//     value: T
// }

// const createNode = <T>(v: T): LinkedNode<T> => ({
//     prev: null,
//     next: null,
//     value: v,
// });

export default class LinkedList<T = unknown> {
    head: LinkedNode<T> | null = null;
    tail: LinkedNode<T> | null = null;

    constructor(...values: T[]) {
        if (typeof values === 'undefined') return;

        const length = values.length;
        let lastNode: LinkedNode<T>;

        values.forEach((v, i) => {
            const currentNode = new LinkedNode(v);

            if (lastNode) {
                lastNode.next = currentNode;
                currentNode.prev = lastNode;
            } else {
                lastNode = currentNode;
                this.head = lastNode;
            }

            // last one
            if (i === length - 1) {
                this.tail = currentNode;
            }
        });
    }

    add(value: T) {
        const targetNode = new LinkedNode(value);

        // list is empty
        if (this.head === null) {
            this.head = targetNode;
            this.tail = targetNode;
            return;
        }

        if (this.tail) {
            this.tail.next = targetNode;
            targetNode.prev = this.tail;
            this.tail = targetNode;
        }
    }

    prepend(value: T) {
        const targetNode = new LinkedNode(value);

        if (this.head === null) {
            this.head = targetNode;
            this.tail = targetNode;
            return;
        }

        this.head.prev = targetNode;
        targetNode.next = this.head;
        this.head = targetNode;
    }

    contains(value: T): boolean {
        let foundNode = this.head;

        if (this.head === null) return false;

        while (foundNode && foundNode.value !== value) {
            foundNode = foundNode.next;
        }

        return !!foundNode;
    }

    remove(value: T): boolean {
        let foundNode = this.head;

        if (this.head === null) return false;

        while (foundNode && foundNode.value !== value) {
            foundNode = foundNode.next;
        }

        if (!foundNode) return false;

        // single node
        if (foundNode.prev === null && foundNode.next === null) {
            this.head = null;
            this.tail = null;
            return true;
        }

        // head
        if (foundNode.prev === null && foundNode.next) {
            foundNode.next.prev = null;
            this.head = foundNode.next;
            return true;
        }

        // tail
        if (foundNode.next === null && foundNode.prev) {
            foundNode.prev.next = null;
            foundNode.prev = null;
            this.tail = foundNode.prev;
            return true;
        }

        // middle
        if (foundNode.prev && foundNode.next) {
            foundNode.prev.next = foundNode.next;
            foundNode.next.prev = foundNode.prev;
            foundNode.prev = null;
            foundNode.next = null;
            return true;
        }

        return false;
    }

    traverse(callback: (value: T) => void) {
        let lastNode = this.head;

        if (this.head === null) return;

        while (lastNode) {
            callback(lastNode.value);
            lastNode = lastNode.next;
        }
    }

    teverseTraversal(callback: (value: T) => void) {
        let lastNode = this.tail;

        if (this.tail === null) return;

        while (lastNode) {
            callback(lastNode.value);
            lastNode = lastNode.prev;
        }
    }

    toArray() {
        const nodes = [];

        let lastNode = this.head;

        while (lastNode) {
            nodes.push(lastNode);
            lastNode = lastNode.next;
        }

        return nodes;
    }

    toString(callback?: (v: T) => string) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}