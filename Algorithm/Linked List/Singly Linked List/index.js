const { Node, LinkedList } = require("./singlyLinkedList");

const ll = new LinkedList();
// three nodes
ll.append(1);
ll.append(2);
ll.append(3);

ll.print();
console.log(ll.size);

console.log(ll.deleteAt(2));
ll.print();
console.log(ll.size);
