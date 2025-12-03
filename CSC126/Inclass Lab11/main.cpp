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

double myCeil(double num) {
    
}

void displayMenu() {
    cout << "Please select your option and press enter:" << endl;
    cout << "1. fabs" << endl;
    cout << "2. ceil" << endl;
    cout << "3. floor" << endl;
    cout << "4. round" << endl;
    cout << "5. pow" << endl;
    cout << "6. quit" << endl;
}

int main() {
    int userChoice;
    int num;
    do {
        displayMenu();
        cin >> userChoice;
        switch (userChoice){
        case 1: // fabs
            cout << "Enter a number: ";
            cin >> num;
            cout << "The absolute value of " << num << " = " << fabs(num) << endl;
            break;
        case 2: // ceil
            cout << "Enter a number: ";
            cin >> num;
            cout << "The ceiling of " << num << " = " << myCeil(num) << endl;
        default:
            break;
        }
    } while (userChoice != 6);
    return 0;
}
