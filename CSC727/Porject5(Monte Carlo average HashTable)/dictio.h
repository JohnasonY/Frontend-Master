#include <iostream>
//exception is thrown if wrong input
using namespace std;

class BadInput {
public:
  BadInput (){};
};
template <class E, class K>
struct Node {
  E data;
  Node<E,K>  *next;
};

/**
 * Sorted linked list with the key sorting increasing
 */
template <class E, class K>
class SortedChain {
public:
  SortedChain() {first=0;}
  ~SortedChain();
  bool IsEmpty() {return (first==0);}
  //int Length() const;
  //bool Search (const K& k, const E& e);
  SortedChain<E,K>& Delete(const K& k, E& e);
  SortedChain<E,K>& Insert (const K& k,const E& e);
  void Output() const;
private:
  Node<E,K> *first;
};

template <class E, class K>
 SortedChain<E,K>::~SortedChain()
{
   Node<E,K> *current=first;
   while (first)
     { current=first->next;
       delete first;
       first=current;
     }
}

/**
 * Delete the node with the given key k
 */
template <class E, class K>
SortedChain<E,K>& SortedChain<E,K>::Delete(const K& k, E& e)
{
   Node<E,K> *prior=first, *current=first;
   while (current && current->data.Key() < k){  //search until key=k or key > k
       prior=current; 
       current=current->next; 
   }    
   if (current && current->data.Key() == k) {  // 
       e=current->data;
       if (first == current) //delete first node
          first=current->next;
       else
           prior->next=current->next;
       delete current;
       return *this;
   }   
   else
       throw BadInput();
}


/**
 * Insert a node with key k and value e into the sorted linked list
 */
template <class E, class K>
SortedChain<E,K>& SortedChain<E,K>::Insert(const K& k, const E& e)
{
   Node<E,K> *prior=first, *current=first;
   while (current && (current->data).Key() < k){  
       prior=current; 
       current=current->next; 
   }    
   if (current && (current->data).Key() == k) 
        throw BadInput(); //another node with same key
   else {
       Node<E,K> *newp;
       newp=new Node<E,K>;
       if (first == current) { //we like to insert on first position
          first=newp;
       }
       else
           prior->next=newp;
       newp->next = current;
       newp->data=e;
       return *this;
       
   }
}
template <class E, class K>
void SortedChain<E,K>::Output() const
{
   Node <E,K> *current=first;
   cout <<  endl;
   while (current) {
     cout << current->data.Key() << " " << current->data.Value() << " -> ";
     current=current->next;
   }
}
   
class TypeE {
public:
  long key;
  long value;
  TypeE(){};
  long Key(){return key;}
  long Value(){return value;}
};

// main()
// {
//   try {  

//          SortedChain<TypeE, long> Chain;
//          TypeE e;
//          e.key=2;
//          e.value = 1000;
//          Chain.Insert(e.Key(),e);
//          e.key=4;
//          e.value =500;
//          Chain.Insert(e.Key(),e);
//          e.key=6;
//          e.value =1500;
//          Chain.Insert(e.Key(),e);
//          e.key=1;
//          e.value=3000;
//          Chain.Insert(e.Key(),e);
//          Chain.Output();
//          Chain.Delete(2,e);
//          Chain.Output();
//   }
//     catch (BadInput) {
//       cerr << endl << "Bad Input";
//     }
// }  
     






