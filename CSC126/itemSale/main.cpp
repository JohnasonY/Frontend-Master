#include <iostream>

bool worthWait(double regularPrice, double salePrice) {
    int percentOff = 0.5;
    if (salePrice <= regularPrice * 0.5 && regularPrice - salePrice >= 20) {
        return true;
    }
    return false;
}

int main() {
    
    return 0;
}