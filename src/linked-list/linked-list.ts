/**
 * @description 单向链表
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list
 * @export
 * @class linkedList
 */

import { comparator } from '../utils/comparator';
import { LinkedNode } from './linked-node';

type NullableNode<T> = LinkedNode<T> | null;

export class LinkedList<T> {
    head: NullableNode<T> = null;
    tail: NullableNode<T> = null;
    private compare: (a: unknown, b: unknown) => boolean;

    constructor(comparatorFunction = comparator.compare) {
        this.compare = (a, b) => comparatorFunction(a, b) === 0;
    }

    append(value: T): this {
        const newNode = new LinkedNode(value);

        if (this.head === null || this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        return this;
    }

    prepend(value: T): this {
        const newNode = new LinkedNode(value);

        if (this.head === null || this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        return this;
    }

    delete(value: T): NullableNode<T> {
        let foundNode: NullableNode<T> = null;

        if (this.head === null || this.tail === null) return null;
        
        let currentNode: NullableNode<T> = this.head;
        let lastNode: NullableNode<T> = null;
        
        while (currentNode) {
            if (this.compare(currentNode.value, value)) {
                foundNode = currentNode;

                // head
                if (lastNode === null) {
                    this.head = currentNode.next;
                } else {
                    // middle
                    lastNode.next = currentNode.next;
                }

                // tail
                if (currentNode.next === null) {
                    this.tail = lastNode;
                }
            } else {
                lastNode = currentNode;
            }

            currentNode = currentNode.next;
        }

        return foundNode;
    }

    deleteHead(): NullableNode<T> {
        const deletedNode = this.head;

        // single node
        if (this.head?.next === null) {
            this.head = null;
            this.tail = null;
        } else if (deletedNode) {
            this.head = deletedNode.next;
        }

        return deletedNode;
    }

    deleteTail(): NullableNode<T> {
        let lastNode = null;
        let currentNode = this.head;

        if (this.head === null) return null;

        while (currentNode?.next) {
            lastNode = currentNode;
            currentNode = currentNode.next;
        }

        
        // single node
        if (lastNode === null) {
            this.head = null;
            this.tail = null;
        } else {
            lastNode.next = null;
            this.tail = lastNode;
        }

        return currentNode;
    }

    reverse(): this {
        const nodeList: LinkedNode<T>[] = [];
        let currentNode = this.head;

        if (this.head === null) return this;

        while (currentNode) {
            nodeList.push(currentNode);
            currentNode = currentNode.next;
        }

        nodeList.reverse().forEach((node, index) => {
            const preNode = index > 0 ? nodeList[index - 1] : null;
            if (index === 0) {
                this.head = node;
            }

            if (index === nodeList.length - 1) {
                this.tail = node;
                node.next = null;
            }

            if (preNode) {
                preNode.next = node;
            }
        });

        return this;
    }

    find({ value, callback } : { value?: T; callback?: (v: T) => boolean }): NullableNode<T> {
        let currentNode = this.head;

        while (currentNode) {
            const result = callback ? callback(currentNode.value) : this.compare(currentNode.value, value);
            
            if (result) return currentNode;

            currentNode = currentNode.next;
        }

        return null;
    }

    fromArray(values: T[]): this {
        let lastNode: NullableNode<T> = null;

        values.forEach((value, index) => {
            const newNode = new LinkedNode(value);

            if (index === 0) {
                this.head = newNode;
            }

            if (index === (values.length - 1)) {
                this.tail = newNode;
            }

            if (lastNode) {
                lastNode.next = newNode;
            }

            lastNode = newNode;
        });

        return this;
    }

    toArray(): LinkedNode<T>[] {
        const list: LinkedNode<T>[] = [];
        let currentNode = this.head;

        while (currentNode) {
            list.push(currentNode);
            currentNode = currentNode.next;
        }

        return list;
    }

    toString(callback?: (v: T) => string): string {
        return this.toArray().map(node => node.toString(callback)).toString();   
    }
}