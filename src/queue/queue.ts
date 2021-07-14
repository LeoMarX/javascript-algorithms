/**
 * @description 队列
 * @link https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/queue
 * @export
 * @class Queue
 */

import { LinkedList, NullableNode } from '../linked-list/linked-list';

export class Queue<T> {
    linkedList: LinkedList<T>;

    constructor() {
        this.linkedList = new LinkedList();
    }

    enqueue(value: T): NullableNode<T> {
        this.linkedList.append(value);
        return this.linkedList.tail;
    }

    dequeue(): T | null {
        const deleteNode = this.linkedList.deleteHead();
        console.log('deleteNode: ', deleteNode);
        return deleteNode ? deleteNode.value : null;
    }

    peek(): T | null {
        return this.linkedList.head?.value ?? null;
    }

    isEmpty(): boolean {
        return this.linkedList.head === null;
    }

    toString(callback?: (v: T) => string): string {
        return this.linkedList.toString(callback);
    }
}