# Doubly Linked List

## Properties

1. Each node contains three components:
   - value/data
   - next: pointer to the next node
   - prev: pointer to the previous node

2. Bidirectional traversal

3. insertion and deletion more convenient

   - No need to keep track of the previous node

   - can directly obtain previous node from prev

   - For example: Assume we need to remove the current node

     ```js
     current.prev.next = current.next;
     current.next.prev = current.prev;
     ```

     

   



