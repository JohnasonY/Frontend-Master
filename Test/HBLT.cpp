#include <iostream>
using namespace std;

class OutOfBounds {
   public:
	    OutOfBounds () {};
};

template <class T>
class MaxHBLT; //forward declaration
template <class T>
class Node {
	friend MaxHBLT<T>;
public:
	Node (const T& e, const int sh) 
	{
		data=e; s=sh;
		LeftChild = RightChild = 0;
	}
private: 
	int s; // s value of node
	T data;
	Node<T> *LeftChild, *RightChild;
};

template <class T>
class MaxHBLT {
public:
	MaxHBLT() {root = 0;}
	//~MaxHBLT () {};
	T Max() {
		  if (!root) throw OutOfBounds();
	          return root->data;
        }
	MaxHBLT<T>& Insert (const T& x);
        MaxHBLT<T>& Delete (T& x);
	MaxHBLT<T>& Meld(MaxHBLT& x) {
		      Meld (root, x.root);
		      x.root=0;
		      return *this;
	}
private:
	void Meld(Node<T>* &x, Node<T>* y);
	Node<T> *root;
};



template <class T>
void MaxHBLT<T>::Meld (Node<T>* &x, Node<T>* y)
{
	// meld trees with root x and y and return the meld
	// tree with root x
	if (!y) return; // y is empty
        if (!x) { // x is empty but y is not empty
           x=y; return; // make x point to y
	}
	if (x->data < y->data) {// swap x with y
		                // the new meld tree will have
	                        // x as the root and we will
		                // meld y with the right child of
		                // x
                Node<T> * temp;
		temp=x;
		x=y;
		y=temp;
	}
	Meld(x->RightChild,y);
	if (!x->LeftChild) { //left subtree is empty
		                 // swap subtrees
		x->LeftChild=x->RightChild;
		x->RightChild = 0;
		x->s=1;
	} else { // see if subtrees are to be swapped
		if (x->LeftChild->s < x->RightChild->s) { //swap                                                           //subtrees
                   Node<T> * temp1;
		   temp1=x->LeftChild;
		   x->LeftChild=x->RightChild;
	    	   x->RightChild=temp1;
	         }
                 x->s=x->RightChild->s + 1;
	       }
}
template <class T>
MaxHBLT<T>& MaxHBLT<T>::Insert(const T& x)
{
  Node<T> *q = new Node<T> (x,1);
  Meld(root,q);
  return *this;
}

template <class T>
MaxHBLT<T>& MaxHBLT<T>::Delete(T& x)
{ //Delete max element and put it in x
	if (!root) throw OutOfBounds();
	x=root->data;
	Node<T> *L = root->LeftChild;
	Node<T> *R = root->RightChild;
	delete root;
	root=L;
	Meld(root,R);
	return *this;
}

int main()
{
	try {
		  MaxHBLT<int> H;
		  int x;
		  H.Insert(5).Insert(6).Insert(9).Insert(8);
		  H.Insert(5).Insert(7).Insert(10).Insert(20);
		  cout << endl;
		  while(1) {
			  H.Delete (x);
			  cout << x << "->" ;
          }
	}
	catch (OutOfBounds) {
		cerr << endl << "out of bounds" << endl;
	}
}