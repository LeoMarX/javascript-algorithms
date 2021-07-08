
/**
 * @description 双向链表
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/doubly-linked-list/README.zh-CN.md
 */
import DoublyLinkedNode from './doubly-linked-node';

export default class DoublyLinkedList<T = unknown> {
    head: DoublyLinkedNode<T> | null = null;
    tail: DoublyLinkedNode<T> | null = null;

    constructor(...values: T[]) {
        if (values) {
            this.fromArray(values);
        }
    }

    append(value: T): this {
        const targetNode = new DoublyLinkedNode(value);

        // list is empty
        if (this.head === null) {
            this.head = targetNode;
            this.tail = targetNode;
            return this;
        }

        if (this.tail) {
            this.tail.next = targetNode;
            targetNode.previous = this.tail;
            this.tail = targetNode;
        }

        return this;
    }

    prepend(value: T): this {
        const targetNode = new DoublyLinkedNode(value);

        if (this.head === null) {
            this.head = targetNode;
            this.tail = targetNode;
            return this;
        }

        this.head.previous = targetNode;
        targetNode.next = this.head;
        this.head = targetNode;

        return this;
    }

    find(value: T): boolean {
        let foundNode = this.head;

        if (this.head === null) return false;

        while (foundNode && foundNode.value !== value) {
            foundNode = foundNode.next;
        }

        return !!foundNode;
    }

    delete(value: T): boolean {
        let foundNode = this.head;

        if (this.head === null) return false;

        while (foundNode && foundNode.value !== value) {
            foundNode = foundNode.next;
        }

        if (!foundNode) return false;

        // single node
        if (foundNode.previous === null && foundNode.next === null) {
            this.head = null;
            this.tail = null;
            return true;
        }

        // head
        if (foundNode.previous === null && foundNode.next) {
            foundNode.next.previous = null;
            this.head = foundNode.next;
            return true;
        }

        // tail
        if (foundNode.next === null && foundNode.previous) {
            foundNode.previous.next = null;
            foundNode.previous = null;
            this.tail = foundNode.previous;
            return true;
        }

        // middle
        if (foundNode.previous && foundNode.next) {
            foundNode.previous.next = foundNode.next;
            foundNode.next.previous = foundNode.previous;
            foundNode.previous = null;
            foundNode.next = null;
            return true;
        }

        return false;
    }

    traverse(callback: (value: T) => void): void {
        let lastNode = this.head;

        if (this.head === null) return;

        while (lastNode) {
            callback(lastNode.value);
            lastNode = lastNode.next;
        }
    }

    teverseTraversal(callback: (value: T) => void): void {
        let lastNode = this.tail;

        if (this.tail === null) return;

        while (lastNode) {
            callback(lastNode.value);
            lastNode = lastNode.previous;
        }
    }

    fromArray(values: T[]): this {
        if (typeof values === 'undefined') return this;

        const length = values.length;
        let lastNode: DoublyLinkedNode<T>;

        values.forEach((v, i) => {
            const newNode = new DoublyLinkedNode(v);
            
            if (lastNode) {
                lastNode.next = newNode;
                newNode.previous = lastNode;
                lastNode = newNode;
            } else {
                lastNode = newNode;
                this.head = lastNode;
            }

            // last one
            if (i === length - 1) {
                this.tail = newNode;
            }
        });

        return this;
    }

    toArray(): DoublyLinkedNode<T>[] {
        const nodes: DoublyLinkedNode<T>[] = [];

        let lastNode = this.head;

        while (lastNode) {
            nodes.push(lastNode);
            lastNode = lastNode.next;
        }

        return nodes;
    }

    toString(callback?: (v: T) => string): string {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}