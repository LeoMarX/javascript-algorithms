
export default class DoublyLinkedNode<T> {
    previous: DoublyLinkedNode<T> | null = null;
    next: DoublyLinkedNode<T> | null = null;
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    toString(callback?: (v: T) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}