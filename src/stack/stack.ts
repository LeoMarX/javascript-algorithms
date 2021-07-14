/**
 *
 * @description 栈
 * @link https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/stack
 * @export
 * @class Stack
 */
import { LinkedList } from '../linked-list/linked-list';

export class Stack<T> {
  linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value: T): void {
    this.linkedList.prepend(value);
  }

  pop(): T | null {
    const deleteNode = this.linkedList.deleteHead();
    return deleteNode?.value || null;
  }

  peek(): T | null {
    return this.linkedList.head?.value || null;
  }

  isEmpty(): boolean {
    return this.linkedList.head === null;
  }

  toArray(): T[] {
    return this.linkedList.toArray().map((n) => n.value);
  }

  toString(callback?: (v: T) => string): string {
    return this.linkedList.toString(callback);
  }
}
