import numpy
import networkx
import matplotlib.pyplot

# original matrix
oriAdjMatrix = numpy.array(
    [
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    ]
)

# convert matrix into graph
oriAdjMatrixGraph = networkx.from_numpy_array(oriAdjMatrix)

# set the nodes' position
pos = networkx.spring_layout(oriAdjMatrixGraph, seed=42)

# draw the graph
networkx.draw(
    oriAdjMatrixGraph,
    pos=pos,
    with_labels=True,
    node_color="lightgreen",
    node_size=800,
    font_size=12,
)
# display the original graph
matplotlib.pyplot.show()

# print the original adjacency matrix
print("Original Adjacency Matrix")
print(oriAdjMatrix)

print("\n")

# create an 16 x 16 identity matrix
identiyMatrix = numpy.eye(16, dtype=int)

# adjacency matrix with self-loop
adjMatrixSelfLoop = oriAdjMatrix + identiyMatrix

# calculate the column sum of the adjacency matrix with self-loop
columnSums = adjMatrixSelfLoop.sum(axis=0)

# Normalize each column to create a Markov transition matrix
# divide each entry by its column sum
markovTransMatrix = adjMatrixSelfLoop / columnSums
# round every entry to 2 decimal places
markovTransMatrix = numpy.round(markovTransMatrix, 2)

# convert markovTransMatrix into graph
markovTransMatrixGraph = networkx.from_numpy_array(markovTransMatrix)

# use the same node positions as the original
# draw the raph
networkx.draw(
    markovTransMatrixGraph,
    pos=pos,
    with_labels=True,
    node_color="lightgreen",
    node_size=800,
    font_size=12,
)
# Get the weight of each edge and round to 2 decimal places
edgeLabels = {
    (u, v): round(data["weight"], 2)
    for u, v, data in markovTransMatrixGraph.edges(data=True)
}
# draw the weights
networkx.draw_networkx_edge_labels(
    markovTransMatrixGraph, pos=pos, edge_labels=edgeLabels
)
# display the graph
matplotlib.pyplot.show()

# print the Markov transition matrix
print("Markov transition matrix")
print(markovTransMatrix)
