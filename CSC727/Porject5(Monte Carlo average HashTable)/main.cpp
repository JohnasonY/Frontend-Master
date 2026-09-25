#include <iostream>
#include "dictio.h" // This is the header file containing the definition of the class SortedChain (Dictionary) that we covered previously 
                    // See the source file for the dictionary that is in the web-page for CSC727.

using namespace std;

template <class E, class K>
class HashTable {
public:
  HashTable(int divisor = 11) {D=divisor;ht=new SortedChain<E,K> [D];}
  ~HashTable(){delete [] ht;}
  //bool Search (const K& k, const E& e);
  HashTable<E,K>& Delete(const K& k, E& e) {ht[k % D].Delete(k,e);return *this;}
  HashTable<E,K>& Insert (const K& k,const E& e){ht[k % D].Insert(k,e);return *this;}
  void Output() const;
private:
  int D;
  SortedChain<E,K> *ht;
};
/*
template <class E, class K>
void SortedChain<E,K>::Output() const
{
   ChainNode *current=ht;
   cout <<  endl << endl;
   int mod=0;
   while (current) {
   cout << "========== " << "keys with mod " << mod << 
   }
}
*/ 

// class TypeE {
// public:
//   long key;
//   long value;
//   TypeE(){};
//   long Key(){return key;}
//   long Value(){return value;}
// };

int main()
{
  try {  

         SortedChain<TypeE, long> Chain;
         TypeE e;
         e.key=2;
         e.value = 1000;
         Chain.Insert(e.Key(),e);
         e.key=4;
         e.value =500;
         Chain.Insert(e.Key(),e);
         e.key=6;
         e.value =1500;
         Chain.Insert(e.Key(),e);
         e.key=1;
         e.value=3000;
         Chain.Insert(e.Key(),e);
         Chain.Output();
         Chain.Delete(2,e);
         Chain.Output();
  }
    catch (BadInput) {
      std::cerr << std::endl << "Bad Input";
    }
}  
     





