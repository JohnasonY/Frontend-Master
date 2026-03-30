#ifndef MYCLASS_H
#define MYCLASS_H

#include <string>

class MyClass
{
private:
    std::string name;
    int value;

public:
    // Constructor
    MyClass(std::string name, int value);

    // Member functions
    void display() const;
    void setValue(int v);
    int getValue() const;
};

#endif