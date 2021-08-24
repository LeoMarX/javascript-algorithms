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

import { comparator } from '../utils/comparator'

export class MinHeap<T = number> {
    private heap: T[];

    constructor() {
        this.heap = [];
    }

    private compare = (v1: T, v2: T) => comparator.compare(v1, v2) <= 0;

    private getParentIndex(currentIndex: number) {
        const result = Math.floor((currentIndex - 1) / 2);

        return result < 0 ? null : result;
    }

    private getChildIndex(currentIndex: number): [number | undefined, number | undefined] {
        const leftChildIndex = currentIndex * 2 + 1;
        const rightChildIndex = currentIndex * 2 + 2;
        const maxIndex = this.heap.length - 1;
        return [ leftChildIndex > maxIndex ? undefined : leftChildIndex, rightChildIndex > maxIndex ? undefined : rightChildIndex];
    }

    private swap(index1: number, index2: number) {
        const heap = this.heap;
        [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
    }

    private heapifyUp(startIndex: number = this.heap.length - 1) {
        const heap = this.heap;
        let currentIndex = startIndex;
        let parentIndex = this.getParentIndex(currentIndex);

        while (parentIndex !== null && !this.compare(heap[parentIndex], heap[currentIndex])) {
            this.swap(currentIndex, parentIndex);

            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex);
        }

        return this;
    }

    private heapifyDown(startIndex = 0) {
        const heap = this.heap;
        let currentIndex = startIndex;
        let nextIndex = this.getChildIndex(currentIndex)[0];
        
        while(nextIndex) {
            const [leftChildIndex, rightChildIndex] = this.getChildIndex(currentIndex);

            // 右边最小，左边最大
            if (leftChildIndex && rightChildIndex && this.compare(heap[rightChildIndex], heap[leftChildIndex])) {
                nextIndex = rightChildIndex;
            } else {
                nextIndex = leftChildIndex;
            }

            if (typeof nextIndex === 'undefined')  break;

            if (this.compare(heap[currentIndex], heap[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    add(value: T): this {
        this.heap.push(value);
        this.heapifyUp();

        return this;
    }

    remove(value: T, comparator?: (v1: T, v2: T) => 0 | -1 | 1): this {
        const heap = this.heap;

        const foundList = this.find(value, comparator);

        foundList.forEach(() => {
            const [ itemIndex ] = this.find(value, comparator);
            const parentIndex = this.getParentIndex(itemIndex);
            const [ leftChildIndex ] = this.getChildIndex(itemIndex);
            // heap.splice(itemIndex, 1);

            if (itemIndex === heap.length - 1) {
                heap.pop();
                return;
            }

            heap[itemIndex] = (heap.pop() as T);

            if (leftChildIndex && !parentIndex) {
                this.heapifyDown(itemIndex);
            } else {
                this.heapifyUp(itemIndex);
            }
        });

        return this;
    }

    find(value: T, comparator?: (v1: T, v2: T) => 0 | -1 | 1): number[] {
        const foundIndex: number[] = [];

        const heap = this.heap;
        const compareFn = comparator ?? ((v1: unknown, v2: unknown) => (v1 as number) - (v2 as number));

        for (let i = 0, length = heap.length; i < length; i ++) {
            if (compareFn(value, heap[i]) === 0) {
                foundIndex.push(i);
            }
        }

        return foundIndex;
    }

    poll(): T | null {
        const result = this.heap.shift();

        // Move the last element from the end to the head. I don't know why.
        this.heap.unshift(this.heap.pop() as T);

        this.heapifyDown();

        return result || null;
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