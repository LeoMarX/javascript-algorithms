/**
 * @description 双向链表
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/doubly-linked-list/README.zh-CN.md
 */
import { comparator } from '../utils/comparator';
import DoublyLinkedNode from './doubly-linked-node';

type NullableNode<T> = DoublyLinkedNode<T> | null;

export class DoublyLinkedList<T = unknown> {
  head: NullableNode<T> = null;
  tail: NullableNode<T> = null;

  constructor(comparatorFunction = comparator.compare) {
    this.compare = (a, b) => comparatorFunction(a, b) === 0;
  }

  private compare: (a: unknown, b: unknown) => boolean;

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

  find({
    value,
    callback,
  }: {
    value?: T;
    callback?: (v: T) => boolean;
  }): NullableNode<T> {
    let foundNode = this.head;

    if (this.head === null) return foundNode;

    if (callback) {
      while (foundNode && !callback(foundNode.value)) {
        foundNode = foundNode.next;
      }
    } else {
      while (foundNode && !this.compare(foundNode.value, value)) {
        foundNode = foundNode.next;
      }
    }

    return foundNode;
  }

  delete(value: T): NullableNode<T> {
    let foundNode = null;

    if (this.head === null) return null;

    let currentNode: NullableNode<T> = this.head;

    while (currentNode) {
      if (this.compare(currentNode.value, value)) {
        foundNode = currentNode;
        // single node
        if (currentNode.previous === null && currentNode.next === null) {
          this.head = null;
          this.tail = null;
        }
        // head
        else if (currentNode.previous === null && currentNode.next) {
          currentNode.next.previous = null;
          this.head = currentNode.next;
        }
        // tail
        else if (currentNode.next === null && currentNode.previous) {
          currentNode.previous.next = null;
          this.tail = currentNode.previous;
        }
        // middle
        else if (currentNode.previous && currentNode.next) {
          currentNode.previous.next = currentNode.next;
          currentNode.next.previous = currentNode.previous;
        }
      }

      currentNode = currentNode.next;
    }

    return foundNode;
  }

  deleteHead(): NullableNode<T> {
    const deletedHead = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.head?.next) {
      this.head = this.head.next;
      this.head.previous = null;
    }

    return deletedHead;
  }

  deleteTail(): NullableNode<T> {
    const deletedNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.tail?.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }

    return deletedNode;
  }

  reverse(): this {
    if (this.head === this.tail) return this;

    let lastNode = null;
    let currentNode = this.tail;

    while (currentNode) {
      const prevNode = currentNode.previous;

      currentNode.next = prevNode;
      currentNode.previous = lastNode;

      lastNode = currentNode;
      currentNode = prevNode;
    }

    // swap
    [this.head, this.tail] = [this.tail, this.head];

    return this;
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
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
