/**
 *
 * @description 优先队列
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/priority-queue/README.md
 * @export
 * @class PriorityQueue
*/

import { MinHeap } from '../heap/min-heap';

type InnerStore<T> = Partial<{ [k: number]: T[] }>;

export class PriorityQueue<T = number> {
    heap: MinHeap<number>;
    
    store: InnerStore<T>;

    constructor() {
        this.heap = new MinHeap();
        this.store = {} as InnerStore<T>;
    }

    add(value: T, priority: number): this {
        this.heap.add(priority);
        this.store[priority] = (this.store[priority] ?? []).concat(value);
        return this;
    }

    poll(): T | null {
        const key = this.heap.peek();

        if (!(typeof key === 'number' && Array.isArray(this.store[key]))) return null;

        const values = this.store[key] as T[];

        if (values.length <= 1) {
            delete this.store[key];
        }

        this.heap.poll();

        return values.shift() as T;
    }

    peek(): T | null {
        const key = this.heap.peek();

        if(typeof key !== 'number') return null;

        return this.store[key]?.[0] ?? null;
    }

    hasValue(value: T): boolean {
        return true;
    }

    changePriority(value: T, priority: number): this {
        this.heap.remove(priority);
        const values = this.store[priority];

        if (values && values?.length > 1) {
            const index = values.indexOf(value);

            values.splice(index, 1);
        } else {
            delete this.store[priority];
        }

        this.add(value, priority);

        return this;
    }
}