type NullableTreeNode<T> = BinaryTreeNode<T> | null;

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
    return this;
  }

  setRight(node: NullableTreeNode<T>): this {
    return this;
  }

  traverseInOrder() {
    return;
  }

  replaceChild(node: NullableTreeNode<T>, newNode: NullableTreeNode<T>): this {
    return this;
  }

  removeChild(node: NullableTreeNode<T>): this {
    return this;
  }

  static copyNode<V = number>(root: BinaryTreeNode<V>, newRoot: BinaryTreeNode<V>) {
    return newRoot;
  }
}
