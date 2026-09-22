#include <iostream>
using namespace std;

int tripleLarger(int a, int b) {
    return a < b ? b * 3 : a * 3;
}


int main() {
    int res = tripleLarger(2, 3);
    cout << res << endl;
    return 0;
}