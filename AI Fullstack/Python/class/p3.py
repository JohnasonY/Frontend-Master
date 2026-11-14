# Implement a Singly Linked List Class (LinkedList)
# Implement a singly linked list class called LinkedList that supports the following operations:
# Required Methods
# Method	Description
# __init__(data=None)	Initialize an empty linked list. data can be a list, tuple, or set, and its elements should be used to initialize the nodes of the linked list.
# traverse(callback)	Traverse the linked list and call callback(index, value) for each node.
# __str__()	Return a string representation of the linked list, such as "1 -> 2 -> 3".
# to_list()	Convert the linked list into a Python list and return it.
# append(value)	Add a new node to the end of the linked list.
# prepend(value)	Add a new node to the beginning of the linked list.
# insert(index, value)	Insert a new node at the specified index (0-based indexing).
# delete_by_value(value)	Delete the first node whose value equals value. Return whether the deletion was successful.
# delete_by_index(index)	Delete the node at the specified index and return its value. Return None if the index is out of range.
# find(value)	Find the first node whose value equals value and return its index. Return -1 if not found.
# get(index)	Return the value at the specified index. Return None if the index is out of range.
# get_length()	Return the length of the linked list.
# is_empty()	Check whether the linked list is empty.

# Hint: You may need to define a Node class first to represent each node in the linked list.


class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next


class LinkedList:
    def __init__(self, data=None):
        if data == Node:
            data = []
        data_list = list(data)
        self.head = None
        if len(data) == 0:
            return
        else:
            head = Node(data_list[0])
            self.head = head
            prev = self.head
            for value in data_list[1:]:
                newNode = Node(value)
                prev.next = newNode
                prev = newNode

    def traverse(self, callback):
        current = self.head
        index = 0
        while current != None:
            callback(index, current.data)
            index += 1
            current = current.next

    def __str__(self):
        current = self.head
        while current != None:
            print(current.data, "-> " if current.next != None else "", end="")
            current = current.next

    def to_list():
        pass


def callback(index, value):
    print({index: value})


ll = LinkedList([2, 1, 3, 8, 6])
# ll.traverse(callback)
# ll.__str__()
