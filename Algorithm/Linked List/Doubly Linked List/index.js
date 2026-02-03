// testing file
const { DoublyLinkedList } = require("./doublyLinkedList");

// create a doubly linked list
const dll = new DoublyLinkedList();
dll.insertBefore(0, -1);
dll.print();
console.log(dll.size);
dll.insertBefore(0, -2);
dll.print();
console.log(dll.size);
dll.insertBefore(2, 100);
dll.print();
console.log(dll.size);
dll.insertBefore(1, -1.5);
dll.print(); // -2 -1.5 -1 100

console.log(dll.isEmpty());

/*
dll.forEach((curNode) => {
  console.log(curNode.data);
});
*/

const dataIndex = dll.findIndex(1.1);
console.log(dataIndex);
