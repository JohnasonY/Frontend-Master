class Node {
  constructor(data) {
    // each node has 3 parts
    this.data = data;
    this.next = null; // pointer to the next node
    this.prev = null; // pointer to the previous node
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0; // the length of doubly linked list
  }

  /**
   * print the linked list
   */
  print() {
    let current = this.head;
    let result = []; // store all the nodes
    while (current) {
      result.push(current.data);
      current = current.next; // update current node
    }
    // current is null(not exist), traversal done
    console.log(result.join(" <-> "));
  }

  /**
   * Add a new node to the end of the doubly linked list
   * @param {*} data new node data
   */
  append(data) {
    const newNode = new Node(data);
    // check if the head exists
    if (!this.head) {
      // empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      // head and tail exist
      this.tail.next = newNode;
      newNode.prev = this.tail;
      // update the tail
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * insert a new node before the given index
   * when index = size, insert at the end
   * @param {*} index
   * @param {*} data
   */
  insertBefore(index, data) {
    if (index < 0 || index > this.size) {
      throw new Error("Invalid index");
    }
    const newNode = new Node(data);
    if (index === 0) {
      // insert before head
      newNode.next = this.head;
      if (this.head) {
        this.head.prev = newNode;
      }
      this.head = newNode;
      if (!this.tail) {
        // empty list
        this.tail = newNode;
      }
    } else if (index === this.size) {
      // insert after tail
      // same as append
      this.append(data);
      return;
    } else {
      // insert in the middle
      let current = this.head;
      let curIndex = 0;
      while (current) {
        if (curIndex === index) {
          // newNode <-> current
          newNode.next = current;
          newNode.prev = current.prev;
          current.prev.next = newNode;
          current.prev = newNode;
        }
        // update current node
        current = current.next;
        curIndex++;
      }
    }
    // increment size
    this.size++;
  }

  /**
   * delete the first data appears in the doubly linked list
   * @param {*} data
   * @returns true if delete successfully
   */
  delete(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (this.head === this.tail) {
          // only one node
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          // delete head node
          this.head = this.head.next;
          this.head.prev = null;
        } else if (current === this.tail) {
          // delete tail node
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          // delete middle node
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        // decrement size
        this.size--;
        return true;
      }
      // update current
      current = current.next;
    }
    return false;
  }

  /**
   * remove a node at the given index
   * @param {*} index
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Invalid index");
    }
    let current = this.head;
    let curIndex = 0;
    if (index === 0) {
      // delete head node
      if (this.head === this.tail) {
        // only one node
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else {
      // delete node after head
      while (current) {
        if (curIndex === index) {
          if (current === this.tail) {
            // delete tail node
            this.tail = current.prev;
            this.tail.next = null;
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
          break;
        }
        // update current node
        current = current.next;
        curIndex++;
      }
    }
    this.size--;
  }
}

module.exports = {
  Node,
  DoublyLinkedList,
};
