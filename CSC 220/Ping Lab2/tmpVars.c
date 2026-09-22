#include <stdio.h>
int main()
{
    int x = 97;
    char ch1 = 'A';
    int y = 98;
    char ch2 = 'B';
    unsigned char uc1 = 'E';

    ch1 = x;
    ch2 = y;
    uc1 = 81;
    x += 3;
    y += 3;

    return 0;
}
