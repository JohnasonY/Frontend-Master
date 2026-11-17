# CSC 769 Project 2

### By Jiaxing Rong

Method: I applied MCL-Clustering for this project

Programming Language: Python

Libraries: numpy, networkx, matplotlib

## 1. Get the original adjacency matrix from the graph

![image-20261117161416076](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117161416076.png)

```python
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
```

Display the original graph to ensure it is identical to the original graph

```python
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
```

 ![image-20261117161808164](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117161808164.png)

## 2. Find and show the corresponding MCL representation as a markov-chain

```python
# create an 16 x 16 identity matrix
identiyMatrix = numpy.eye(16, dtype=int)

# adjacency matrix with self-loop
adjMatrixSelfLoop = oriAdjMatrix + identiyMatrix

# calculate the column sum of the adjacency matrix with self-loop
columnSums = adjMatrixSelfLoop.sum(axis=0)

# Normalize each column to create a Markov transition matrix
# divide each entry by its column sum
markovTransMatrix = adjMatrixSelfLoop / columnSums
```

To display the markov-chain matrix into a graph with weights

```python
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
```

![image-20261117171957828](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117171957828.png)

Print out the markov-chain matrix in the terminal

![image-20261117172059805](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117172059805.png)

## 3. Apply and show the corresponding inflation and expansion matrix

Here I set the inflation factor and expansion factor both to 2, and maximum iterations 1000 times

```python
# MCL parameters config
inflationFactor = 2
expansionFactor = 2
maxIterations = 1000
```

Inflation and expansion functions:

```python
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

```

### First inflation and expansion

```python
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
```

![image-20261117172551844](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117172551844.png)

![image-20261117172618704](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117172618704.png)

## 4. Go to step 3 until the matrix converges

```python
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
```

## 5. Print out the last inflation and expansion matrix

![image-20261117173147068](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117173147068.png)

![image-20261117173157953](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117173157953.png)

## 6. Show the last matrix and finally show the clusters (vertices)

![image-20261117174006916](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117174006916.png)

```python
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

```

Show the vertices in clusters in the terminal

![image-20261117174102470](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117174102470.png)

## 7. Display the clusters as graphs using matplotlib

```python
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

```

![image-20261117174318528](C:\Users\jiaxi\AppData\Roaming\Typora\typora-user-images\image-20261117174318528.png)

As a result, there are 4 clusters in this graph.



