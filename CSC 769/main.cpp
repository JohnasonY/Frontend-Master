#include <iostream>
using namespace std;

/**
 * An edge in the graph
 * @param vertex the vertex connected by the edge
 * @param weight the weight of the edge
 * @param next pointer points to the next edge
 */
struct Edge
{
    int vertex;
    int weight;
    Edge *next;
};

/**
 * Undirected weighted graph
 */
class Graph
{
private:
    int V;
    Edge **head;

public:
    /**
     * @param verticesCount number of vertices in the graph
     */
    Graph(int verticesCount)
    {
        V = verticesCount;
        head = new Edge *[V];

        for (int i = 0; i < V; i++)
        {
            head[i] = nullptr;
        }
    }

    /**
     * add an edge in the graph
     * @param u one vertex connected by the edge
     * @param v another vertex connected by the edge
     * @param weight the weight of the edge
     */
    void addEdge(int u, int v, int weight)
    {
        // add v to u's list
        Edge *newEdge = new Edge{v, weight, head[u]};
        head[u] = newEdge;

        // add u to v's list
        newEdge = new Edge{u, weight, head[v]};
        head[v] = newEdge;
    }
};

int main()
{
    Graph g(8);
    // example input from the project document
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 1);
    g.addEdge(0, 3, 2);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 4, 4);
    g.addEdge(2, 3, 1);
    g.addEdge(2, 5, 2);
    g.addEdge(3, 6, 2);
    g.addEdge(4, 5, 4);
    g.addEdge(4, 7, 1);
    g.addEdge(5, 6, 4);
    g.addEdge(5, 7, 5);
    g.addEdge(6, 7, 3);
    return 0;
}