#include "MyClass.h"
#include <iostream>

// Constructor
MyClass::MyClass(std::string name, int value)
{
    this->name = name;
    this->value = value;
}

// Display function
void MyClass::display() const
{
    std::cout << "Name: " << name << ", Value: " << value << std::endl;
}

// Setter
void MyClass::setValue(int v)
{
    value = v;
}

// Getter
int MyClass::getValue() const
{
    return value;
}