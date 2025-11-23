#include <iostream>
using namespace std;

int intPart(double num) {
    // string strNum = to_string(num);
    // string integerPart = "";
    // for (int i = 0; i < strNum.size(); i++) {
    //     if (strNum[i] == '.') {
    //         break;
    //     }
    //     integerPart += strNum[i];
    // }
    // return stod(integerPart);
    return int(num);
}

string decimalPart(double num) {
    string strNum = to_string(num);
    string decimalPart = "";
    bool flag = false;
    for (int i = 0; i < strNum.size(); i++) {
        if (strNum[i] == '.') {
            flag = true;
            continue;
        }
        if (flag == true) {
            decimalPart += strNum[i];
        }
    }
    return decimalPart;
}


int main() {
    cout << intPart(15151251.14) << endl;
    cout << decimalPart(3.1412512511) << endl;
    return 0;
}