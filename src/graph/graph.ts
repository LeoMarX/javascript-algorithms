import type { GraphVertex } from './graph-vertex';
import { GraphEdge } from './graph-edge';

export class Graph {

    constructor(isRoot = false) {

    }

    getWeight(): number {

    }

    reverse() {
        
    }

    addVertex(vertex: GraphVertex): this {
        return this;
    }
    
    addEdge(edge: GraphEdge): this {
        return this;
    }

    deleteEdge(edge: GraphEdge): this {
        return this;
    }

    findEdge(vertexA: GraphVertex, vertexB: GraphVertex): GraphEdge {

    }

    getAllEdges(): GraphEdge[] {
        return [];
    }

    getVertexByKey(key: string): GraphVertex {

    }

    getAllVertices(): GraphVertex[] {
        return [];
    }

    getNeighbors(vertex: GraphVertex): GraphVertex[] {
        return [];
    }

    getVerticesIndices() {

    }

    getAdjacencyMatrix() {

    }
}