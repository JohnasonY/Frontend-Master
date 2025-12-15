#include <iostream>
using namespace std;

void reverseToNewArray(int original[], int size, int reversed[])
{
    int j = 0;
    for (int i = size - 1; i >= 0; i--)
    {
        reversed[j] = original[i];
        j++;
    }
}

int main()
{
    return 0;
}
