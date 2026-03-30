#include <stdio.h>
#include <stdlib.h>

int main()
{
    unsigned int x, *px = &x;
    int *py = (int *)malloc(sizeof(int));
    // Prompt user to enter the unsigned integer 0xaabbccdd in hexadecimal form into x using printf and scanf, then confirm the user’s input.
    printf("Please enter a hexadecimal number aabbccdd: ");
    scanf("%x", &x);
    // Prompt user to enter the integer 0x12345678 in hexadecimal form into *py using printf and scanf, then confirm the user’s input. If a negative value is entered, *py will be the 2’s complement form of the input.
    printf("Please enter a hexadecimal number 12345678: ");
    scanf("%x", py);
    // print out values in x, px, py, and *py with the printf function using appropriate format specifiers.
    printf("x: %x \n", x);
    printf("px: %p \n", px);
    printf("py: %p \n", py);
    printf("*py: %x \n", *py);
    // getchar();
    return 0;
}