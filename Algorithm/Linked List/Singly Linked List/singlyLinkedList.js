class Node {
  // get the data needed to be stored
  constructor(data) {
    this.data = data; // the data for the current node
    this.next = null; // the address of the next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0; // the length of the linked list
  }

  /**
   * print out all nodes' data on the linked list
   */
  print() {
    let current = this.head;
    let result = []; // store all nodes' data
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    // finished traverse linked list, print them out
    console.log(result.join(" -> ") + " -> null");
  }

  /**
   * append a new node at the end of the linked list
   * @param {*} data
   */
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      // traverse the linked list until the end
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // current.next does not exist, current is the last node of the linked list
      current.next = newNode;
    }
    // increment the size of the linked list
    this.size++;
  }

  /**
   * insert a new node before the given index in the original linked list
   * @param {*} index 0~size of the linked list
   * @param {*} data new node's data
   */
  insertAt(index, data) {
    // index security check
    if (typeof index !== "number" || index < 0 || index > this.size) {
      throw new Error("Invalid index");
    }
    // create a new node
    const newNode = new Node(data);
    // check if insert at head
    if (index === 0) {
      // insert at head
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // insert after head
      let count = 0;
      let current = this.head;
      while (current) {
        if (count === index - 1) {
          // the node to be inserted is between the current node and the next node
          newNode.next = current.next;
          current.next = newNode;
          break;
        } else {
          // go to the next node
          current = current.next;
          count++;
        }
      }
    }
    // increment linked list size
    this.size++;
  }

  /**
   * delete the first node with the given data
   * @param {*} data
   * @returns {*} return deleted node's data or undefined if the node not found
   */
  delete(data) {
    let current = this.head;
    let nodeData;
    if (current.data === data) {
      // delete the head node
      nodeData = current.data;
      this.head = current.next;
      // isolate the original head node
      // the original head node will be recycled at appropriate time
      current.next = null;
    } else {
      // traverse the linked list until the current is right before the node to be deleted
      while (current.next) {
        // current has next node
        if (current.next.data === data) {
          break;
        } else {
          current = current.next;
        }
      }
      // current's next node is the node to be deleted
      if (current.next) {
        // we can delete the next node
        // make sure current.next is not null
        nodeData = current.next.data;
        current.next = current.next.next;
      }
    }
    // decrement size
    this.size--;
    return nodeData;
  }

  /**
   * delete the node of the given index
   * @param {*} index
   */
  deleteAt(index) {
    // index security check
    if (typeof index !== "number" || index < 0 || index >= this.size) {
      throw new Error("Invalid index");
    }
    // valid index
    let current = this.head;
    let nodeData;
    if (index === 0) {
      // delete head
      nodeData = current.data;
      this.head = current.next;
      // previous head(the first) node has no way to access it, so it will be recycled at appropriate time
    } else {
      // traverse the linked list until the current node is right before the node to be deleted
      let count = 0;
      while (current.next) {
        if (count === index - 1) {
          break;
        } else {
          // go to the next node
          current = current.next;
          count++;
        }
      }
      // count === index - 1, the current node is right before the node to be deleted
      nodeData = current.next.data;
      current.next = current.next.next;
    }
    // decrement size
    this.size--;
    return nodeData;
  }
}

module.exports = {
  Node,
  LinkedList,
};
