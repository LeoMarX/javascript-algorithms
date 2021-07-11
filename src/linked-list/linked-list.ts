/**
 * @description 单向链表
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list
 * @export
 * @class linkedList
 */

import { comparator} from '../utils/comparator';
import { LinkedNode } from './linked-node';

type NullableNode<T> = LinkedNode<T> | null;

export class LinkedList<T> {
    head: NullableNode<T> = null;
    tail: NullableNode<T> = null;
    private comparator: typeof comparator;

    constructor(comparatorFunction = comparator) {
        this.comparator = comparatorFunction;
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
            if (this.comparator.equal(currentNode.value, value)) {
                foundNode = currentNode;

                // head
                if (lastNode === null) {
                    this.head = currentNode.next;
                }
                
                // tail
                if (currentNode.next === null) {
                    this.tail = null;
                }
            }

            lastNode = currentNode;
            currentNode = currentNode.next;
        }

        return foundNode;
    }

    deleteHead(): NullableNode<T> {
        const deletedNode = this.head;

        if (deletedNode) {
            this.head = deletedNode.next;
        }

        return deletedNode;
    }

    deteleTail(): NullableNode<T> {
        let lastNode = null;
        let currentNode = this.head;

        if (this.head === null) return null;

        while (currentNode?.next) {
            lastNode = currentNode;
            currentNode = currentNode.next;
        }

        if (lastNode) {
            lastNode.next = null;
            this.tail = lastNode;
        } else {
            // single node
            this.head = null;
            this.tail = null;
        }

        return lastNode;
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
            const preNode = nodeList[index - 1];
            if (index === 0) {
                this.head = node;
            }

            if (index === nodeList.length - 1) {
                this.tail = node;
            }

            if (preNode) {
                preNode.next = node;
            }
        });

        return this;
    }

    find({ value, callback } : { value: T, callback: (v1: T, v2: T) => boolean }): void {
        let currentNode = this.head;

        while (currentNode) {
            const result = callback ? callback(value, currentNode.value) : this.comparator.equal(value, currentNode.value);
            
            if (result) return;

            currentNode = currentNode.next;
        }
    }

    fromArray(values: T[]): this {
        let currentNode: NullableNode<T> = null;

        values.forEach((value, index) => {
            const newNode = new LinkedNode(value);

            if (index === 0) {
                this.head = newNode;
            }

            if (index === values.length - 1) {
                this.tail = newNode;
            }

            if (currentNode) {
                currentNode.next = newNode;
            } else {
                currentNode = newNode;
            }
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