/**
 *
 * @description 优先队列
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/priority-queue/README.md
 * @export
 * @class PriorityQueue
 */

import { MinHeap } from '../heap/min-heap';
import { HashTable } from '../hash-table/hash-table';

const toStringKey = (value: unknown): string =>
  typeof value === 'object' ? JSON.stringify(value) : `${value}`;
export class PriorityQueue<T = number> extends MinHeap<T> {
  store: HashTable<number>;

  constructor() {
    super();
    this.store = new HashTable();
  }

  compare = (v1: T, v2: T): boolean => {
    const p1 = this.store.get(toStringKey(v1));
    const p2 = this.store.get(toStringKey(v2));

    if (p1 <= p2) return true;

    return false;
  };

  add(value: T, priority: number): this {
    this.store.set(toStringKey(value), priority);
    super.add(value);
    return this;
  }

  hasValue(value: T): boolean {
    return this.store.has(toStringKey(value));
  }

  remove(value: T): this {
    super.remove(value);
    this.store.delete(toStringKey(value));

    return this;
  }

  changePriority(value: T, priority: number): this {
    this.remove(value);

    this.store.set(toStringKey(value), priority);

    this.add(value, priority);

    return this;
  }
}
