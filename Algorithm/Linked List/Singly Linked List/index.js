const { Node, LinkedList } = require("./singlyLinkedList");

const ll = new LinkedList();
// three nodes
const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
n1.next = n2;
n2.next = n3;
ll.head = n1;

ll.print();
