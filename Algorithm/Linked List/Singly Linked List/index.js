const { Node, LinkedList } = require("./singlyLinkedList");

const ll = new LinkedList();
// three nodes
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.append(5);

ll.print();
console.log(ll.size);

// console.log(ll.deleteAt(2));
// ll.print();
// console.log(ll.size);

// ll.reverse();
// ll.print();

ll.swap(1, 3);
ll.print();
