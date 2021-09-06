import { HashTable } from '../hash-table/hash-table';

type NullableTreeNode<T> = BinaryTreeNode<T> | null;

const toArray = <T>(node: NullableTreeNode<T>) =>
  node && node.value !== null ? node.traverseInOrder() : [null];

/**
 * @description BinaryTreeNode
 * @link https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/tree/README.md
 */
export class BinaryTreeNode<T = number> {
  value: T | null;

  meta = new HashTable();

  parent: NullableTreeNode<T> = null;
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

    if (node && node !== this) {
      node.parent = this;
    }

    return this;
  }

  setRight(node: NullableTreeNode<T>): this {
    this.right = node;

    if (node && node !== this) {
      node.parent = this;
    }

    return this;
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  // balanceFactor = height(leftSubTree) - height(rightSubTree)
  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  get uncle(): BinaryTreeNode<T> | undefined {
    const grandParent = this.parent?.parent;

    if (!grandParent) {
      return undefined;
    } else if (grandParent.left === this.parent) {
      return grandParent.right ?? undefined;
    } else if (grandParent.right === this.parent) {
      return grandParent.left ?? undefined;
    }
  }

  traverseInOrder(): T[] {
    const result = [
      ...toArray(this.left),
      this.value,
      ...toArray(this.right),
    ].filter((val): val is T => val !== null);
    return result;
  }

  replaceChild(
    node: NullableTreeNode<T>,
    newNode: NullableTreeNode<T>,
  ): boolean {
    if (!(node?.value && newNode?.value)) return false;

    if (node === this.left) {
      this.setLeft(newNode);
    } else if (node === this.right) {
      this.setRight(newNode);
    } else {
      return false;
    }

    return true;
  }

  removeChild(node: NullableTreeNode<T>): boolean {
    if (node && node === this.left) {
      this.left = null;
    } else if (node && node === this.right) {
      this.right = null;
    } else {
      return false;
    }

    return true;
  }

  toString(): string {
    return this.traverseInOrder().toString();
  }

  static copyNode<V = number>(
    root: BinaryTreeNode<V>,
    newRoot: BinaryTreeNode<V>,
  ): BinaryTreeNode<V> {
    newRoot.setValue(root.value as V);
    newRoot.setLeft(root.left);
    newRoot.setRight(root.right);
    return newRoot;
  }
}
