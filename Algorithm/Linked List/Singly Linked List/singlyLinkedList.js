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
}

module.exports = {
  Node,
  LinkedList,
};
