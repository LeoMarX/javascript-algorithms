/**
 * 
 * @description 最小堆
 * @note 若一个节点的索引是 n，那么它的左子树的索引是 2n+1，右子树的索引是 2n+2
 * @link https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/heap
 * @link https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65
 * @export
 * @class MinHeap
 * @template T
 */
export class MinHeap<T = number> {
    private heap: T[];

    constructor() {
        this.heap = [];
    }

    add(value: T): this {
        const heap = this.heap;
        heap.push(value);

        let current = heap.length - 1;
        let parent = Math.floor((current - 1) / 2);

        while (heap[current] && heap[parent] && heap[current] < heap[parent]) {
            [heap[current], heap[parent]] = [heap[parent], heap[current]];
            current = parent;
            parent = Math.floor((current - 1) / 2);
        }

        return this;
    }

    remove(value: T, comparator?: (v1: T, v2: T) => 0 | -1 | 1): this {
        const heap = this.heap;
        const compareFn = comparator ?? ((v1: unknown, v2: unknown) => (v1 as number) - (v2 as number));

        let current = heap.length -1;
        let parent = Math.floor((current - 1) / 2);

        while (heap[current] && heap[parent] && value >= heap[current]) {
            current = parent;
            parent = Math.floor((current - 1) / 2);
        }

        for (let i = current; i >= parent; i --) {
            if (compareFn(value, heap[i]) === 0) {
                heap.slice(i, 1);
                return this;
            }
        }

        return this;
    }

    find(value: T, comparator?: (v1: T, v2: T) => 0 | -1 | 1): number[] {
        const foundIndex: number[] = [];

        const heap = this.heap;
        const compareFn = comparator ?? ((v1: unknown, v2: unknown) => (v1 as number) - (v2 as number));

        let current = heap.length -1;
        let parent = Math.floor((current - 1) / 2);

        while (heap[current] && heap[parent] && value >= heap[current]) {
            current = parent;
            parent = Math.floor((current - 1) / 2);
        }

        for (let i = current; i >= parent; i --) {
            if (compareFn(value, heap[i]) === 0) {
                heap.slice(i, 1);
                foundIndex.push(i);
            }
        }

        return foundIndex;
    }

    poll(): T {
        return this.heap.slice(0, 1)[0];
    }

    peek(): T | null {
        return this.heap[0] ?? null;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    toString(): string {
        return this.heap.toString();
    }
}