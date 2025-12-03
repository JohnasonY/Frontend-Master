#include <iostream>
using namespace std;

void CUNY(int &CSI)
{
    CSI = 10;
}

int main()
{
    int arr[3] = {1, 1, 1};
    for (int i = 0; i < 3; i++)
    {
        arr[i]++;
    }
    cout << arr[0];
    return 0;
}