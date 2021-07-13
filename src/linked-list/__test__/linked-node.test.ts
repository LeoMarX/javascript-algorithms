// fork by https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list/__test__/LinkedNode.test.js
import { LinkedNode } from '../linked-node';

describe('LinkedNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe('test');
    expect(node.next).toBeNull();
  });
  
  it('should link nodes together', () => {
    const node2 = new LinkedNode(2);
    const node1 = new LinkedNode(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next?.value).toBe(2);
  });

  it('should convert node to string', () => {
    const node = new LinkedNode<string | number>(1);

    expect(node.toString()).toBe('1');

    node.value = 'string value';
    expect(node.toString()).toBe('string value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedNode(nodeValue);
    const toStringCallback = (value: typeof nodeValue) => `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
});