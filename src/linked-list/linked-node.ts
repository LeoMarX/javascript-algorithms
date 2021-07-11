export class LinkedNode<T> {
    next: LinkedNode<T> | null;
    value: T;

    constructor(value: T, next = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: (v: T) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}