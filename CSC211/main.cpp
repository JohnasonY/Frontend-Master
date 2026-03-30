#include <iostream>
#include "MyClass.h"

int main()
{
    std::cout << "THIS IS MY MAIN" << std::endl;

    int myNum;
    std::cin >> myNum;
    // Create object
    MyClass obj("Example", 10);

    // Use methods
    obj.display();

    obj.setValue(25);
    std::cout << "Updated Value: " << obj.getValue() << std::endl;
    return 0;
}