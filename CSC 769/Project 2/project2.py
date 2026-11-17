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
# each entry display at most 3 decimal points when printed
numpy.set_printoptions(precision=3, suppress=True, linewidth=200)

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


# MCL parameters config
inflationFactor = 2
expansionFactor = 2
maxIterations = 1000
tolerance = 1e-8

# inflation matrix: raise each entry of the matrix to a power, then normalize each column dy entry/columnSum
def inflation(matrix):
    inflationMatrix = matrix ** inflationFactor
    columnSums = inflationMatrix.sum(axis=0)
    inflationMatrix = inflationMatrix / columnSums
    return inflationMatrix

# expansion matrix: matrix * matrix (for expansion factor 2)
def expansion(matrix):
    expansionMatrix = numpy.linalg.matrix_power(
        matrix, expansionFactor
    )
    return expansionMatrix

# Start MCL with the Markov transition matrix
currentMatrix = markovTransMatrix.copy()
converged = False

# first inflation and expansion matrix
firstInflation = inflation(currentMatrix)
firstExpansion = expansion(firstInflation)
print("\n")
print("First Inflation Matrix:")
print(firstInflation)
print("\n")
print("First Expansion Matrix:")
print(firstExpansion)

# Repeat inflation and expansion until converges
for iteration in range(2, maxIterations + 1):
    previousMatrix = currentMatrix.copy()

    # inflation
    inflatedMatrix = inflation(previousMatrix)

    # expansion
    expandedMatrix = expansion(inflatedMatrix)

    # Save the latest inflation and expansion
    lastInflation = inflatedMatrix.copy()
    lastExpansion = expandedMatrix.copy()

    # Update the current matrix
    currentMatrix = expandedMatrix

    # Check convergence
    if numpy.allclose(
        currentMatrix,
        previousMatrix,
        atol=tolerance,
        rtol=0
    ):
        converged = True
        break

print("\n")
print("Last Inflation Matrix:")
print(lastInflation)
print("\n")
print("Last Expansion Matrix:")
print(lastExpansion)

print("\n")
print("Final MCL Matrix:")
print(currentMatrix)

# Find clusters from the final matrix
# Connect vertices that have significant transition values
clusterGraph = networkx.Graph()
clusterGraph.add_nodes_from(range(oriAdjMatrix.shape[0]))

for row in range(currentMatrix.shape[0]):
    for col in range(currentMatrix.shape[1]):
        if currentMatrix[row, col] > 0.001:
            # add edge between vertice row and col
            clusterGraph.add_edge(row, col)

# Each connected component represents one cluster
clusters = sorted(
    [
        sorted(component)
        for component in networkx.connected_components(clusterGraph)
    ],
    key=lambda cluster: cluster[0]
)

print("\n")
print("Clusters:")
for index, cluster in enumerate(clusters):
    print(f"Vertices in cluster {index + 1}: {cluster}")


# Display clusters using matplotlib
colors = [
    "lightgray",
    "lightcoral",
    "lightsalmon",
    "lightblue",
    "lightgreen"
]

nodeColors = [None] * oriAdjMatrix.shape[0]

for index, cluster in enumerate(clusters):
    for node in cluster:
        nodeColors[node] = colors[index % len(colors)]

matplotlib.pyplot.figure(figsize=(10, 8))

networkx.draw(
    oriAdjMatrixGraph,
    pos=pos,
    with_labels=True,
    node_color=nodeColors,
    node_size=800,
    font_size=11,
    edge_color="black"
)

matplotlib.pyplot.title("MCL Clustering Result")
matplotlib.pyplot.show()
