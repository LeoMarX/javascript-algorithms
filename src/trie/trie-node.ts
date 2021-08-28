export class TrieNode {
    
    character: string;

    constructor(node: string, isRoot = false) {
        this.character = node;
    }

    isCompleteWord(): boolean {
        return true;
    }

    addChild(node: string, isRoot = false) {

    }

    getChild(node: string): TrieNode | null {
        return null;
    }

    suggestChildren(): string[] {
        return [];
    }

    hasChild(node: string): boolean {
        return true;
    }

    hasChildren(): boolean {
        return true;    
    }

    removeChild(node: string) {

    }

    toString(): string {
        return '';
    }
}