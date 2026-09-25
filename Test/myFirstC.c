#include <stdio.h>
int main()
{
    int a = 10;
    int b = 20;
    int c = 30;
    int x = 0;
    for (int i = 0; i < 4; i++)
        printf("%-10d%-10d%-10d\n\n", a, b, c);
    printf("Enter an integer: ");
    scanf("%d", &x);
    printf("You entered %d\n\n", x);
    return 0;
}