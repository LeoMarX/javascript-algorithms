type NullableTreeNode<T> = BinaryTreeNode<T> | null;

const toArray = <T>(node: NullableTreeNode<T>) => node && node?.value !== null ? node.traverseInOrder() : [null];
export class BinaryTreeNode<T = number> {
  value: T | null;
  height = 0;
  balanceFactor = 0;

  meta = new Map(); // @test

  parent: NullableTreeNode<T> = null;
  uncle: NullableTreeNode<T> = null;
  left: NullableTreeNode<T> = null;
  right: NullableTreeNode<T> = null;

  constructor(nodeValue: T | null = null) {
    this.value = nodeValue;
  }

  setValue(nodeValue: T): void {
    this.value = nodeValue;
  }

  setLeft(node: NullableTreeNode<T>): this {
    this.left = node;
    return this;
  }

  setRight(node: NullableTreeNode<T>): this {
    this.right = node;
    return this;
  }

  traverseInOrder(): T[] {
    const result = [...toArray(this.left), this.value, ...toArray(this.right)].filter((val): val is T => val !== null);
    return result;
  }

  replaceChild(node: NullableTreeNode<T>, newNode: NullableTreeNode<T>): this {
    if (node === this.left) {
      this.left = newNode;
    } else if (node === this.right) {
      this.right = newNode;
    }

    return this;
  }

  removeChild(node: NullableTreeNode<T>): this {
    if (node === this.left) {
      this.left = null;
    } else if (node === this.right) {
      this.right = null;
    }

    return this;
  }

  toString() {

  }

  static copyNode<V = number>(root: BinaryTreeNode<V>, newRoot: BinaryTreeNode<V>) {
    return newRoot;
  }
}
