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

    void findClosenessCentrality()
    {
        const int INF = 999999;

        // Create distance matrix
        int **dist = new int *[V];

        for (int i = 0; i < V; i++)
        {
            dist[i] = new int[V];

            for (int j = 0; j < V; j++)
            {
                if (i == j) // itself vertex
                    dist[i][j] = 0;
                else // assign to infinity for other nodes
                    dist[i][j] = INF;
            }
        }

        // Copy adjacency list into distance matrix
        for (int i = 0; i < V; i++)
        {
            Edge *current = head[i];

            while (current != nullptr)
            {
                // update distance if current is the adjacent vetex to i
                dist[i][current->vertex] = current->weight;
                current = current->next;
            }
        }

        // Floyd-Warshall
        for (int k = 0; k < V; k++)
        {
            for (int i = 0; i < V; i++)
            {
                for (int j = 0; j < V; j++)
                {
                    if (dist[i][k] != INF && dist[k][j] != INF && dist[i][k] + dist[k][j] < dist[i][j])
                    {
                        // |i, k| + |k, j| < |i, j|
                        // update the shortest distance between i and j if k is the intermediate vertex
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // Find vertex with smallest total distance
        int centralVertex = -1;
        int minimumSum = INF;

        for (int i = 0; i < V; i++)
        {
            int sum = 0;

            for (int j = 0; j < V; j++)
            {
                sum += dist[i][j];
            }

            double closeness =
                static_cast<double>(1) / sum;

            cout << "Vertex " << i << ": closeness = " << closeness << endl;

            if (sum < minimumSum)
            {
                minimumSum = sum;
                centralVertex = i;
            }
        }

        cout << "\nCloseness centrality vertex: " << centralVertex << endl;
    }
};

int main()
{
    Graph g(8);
    // example input from the project document
    // treat vertex s as 0, vertex t as 7
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
    g.findClosenessCentrality();
    return 0;
}