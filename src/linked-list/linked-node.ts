// interface LinkedNode<T = unknown> {
//     prev: LinkedNode<T> | null;
//     next: LinkedNode<T> | null;
//     data: T
// }

export default class LinkedNode<T> {
    prev: LinkedNode<T> | null = null;
    next: LinkedNode<T> | null = null;
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    toString(callback?: (v: T) => string) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}