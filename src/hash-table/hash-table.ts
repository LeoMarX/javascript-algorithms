/**
 *
 * @description 哈希表
 * @link https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/hash-table/
 * @export
 * @class HashTable
*/
import { LinkedList } from '../linked-list/linked-list';
import type { LinkedNode } from '../linked-list/linked-node';

const DEFAULT_BUCKETS_NUMS = 32;
type NodeType<T> = { key: string, value: T };

export class HashTable<T> {
    buckets: LinkedList<NodeType<T>>[];
    keys: Record<string, number>;

    constructor(bucketsNums = DEFAULT_BUCKETS_NUMS) {
        this.buckets = Array.from({length: bucketsNums})
                        .map(() => new LinkedList<NodeType<T>>((a: NodeType<T>, b: NodeType<T>) => a.key === b.key ? 0 : -1));
        this.keys = Object.create(null);
    }

    hash(key: string): number {
        let hash = 0;

        for (let i = 0; i < key.length; i ++) {
            hash += key.charCodeAt(i);
        }

        return hash % this.buckets.length;
    }

    private findNode(key: string): LinkedNode<NodeType<T>> | null {
        const index = this.keys[key];
        const bucket = this.buckets[index];

        if (!bucket) return null;
        
        return bucket.find({ callback: (node) => node.key === key });
    } 

    get(key: string): T | void {
        const foundNode = this.findNode(key);

        return foundNode?.value.value;
    }

    set(key: string, value: T): void {
        const index =  this.keys[key] ?? this.hash(key);
        const bucket = this.buckets[index];
        this.keys[key] = index;

        if (!bucket) return;

        const foundNode = bucket.find({value: { key, value }});

        if (foundNode) {
            foundNode.value.value = value;
        } else {
            bucket.append({ key, value });
        }
    }

    has(key: string): boolean {
        return !isNaN(this.keys[key]);
    }

    delete(key: string): LinkedNode<NodeType<T>> | null {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const foundNode = this.findNode(key);

        if (!bucket || !foundNode) return null;

        delete this.keys[key];
        return bucket.delete(foundNode.value);
    }

    getKeys(): string[] {
        // key 的顺序是不保证稳定的
        return Object.keys(this.keys);
    }

    getValues(): T[] {
        const values: T[] = [];

        this.buckets.forEach(bucket => {
            values.push(...bucket.toArray().map(node => node.value.value));
        });

        return values;
    }
}