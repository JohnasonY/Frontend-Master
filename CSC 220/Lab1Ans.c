#include <stdio.h>
#include <stdlib.h>

int main()
{

    // 1)
    unsigned int x;
    // px points to x
    unsigned int *px = &x;
    // 2)
    // py points to an integer allocated in heap
    int *py = (int *)malloc(sizeof(int));
    // 3)
    printf("Enter an unsigned integer in hexadecimal format (e.g., 0xaabbccdd) to x: ");
    scanf("%x", &x);

    printf("You entered: 0x%x\n", x); // Print the value in lowercase hexadecimal
    // 4)
    printf("\nEnter a positive integer in hexadecimal format (e.g., 0x12345678) to the dynamic location: ");
    scanf("%x", py);

    printf("You entered: 0x%x\n\n", *py);
    // 5)
    printf("x = %17x\tx is stored on stack memory.\n\n", x);
    printf("px = %16p\tpx is an unsigned int type pointer.\n\n", px);
    printf("py = %16p\tpy holds the first address of the dynamic locations on heap.\n\n", py);
    printf("*py = %15x\tthis is the integer that is stored on the heap memory.\n\n", *py);
    // 6)
    unsigned char *pc;
    int i;

    printf("Verify the order bytes of an integer in stack memory:\n");
    // 7)
    // pc points to x
    pc = &x;

    for (i = 0; i < sizeof(x); i++)
    {
        printf("%p\t%x\n", pc, *pc);
        pc++;
    }

    printf("\n\n");
    // 8)
    printf("Verify the order bytes of an integer in heap memory:\n");
    pc = py;

    for (i = 0; i < sizeof(*py); i++)
    {
        printf("%p\t%x\n", pc, *pc);
        pc++;
    }

    printf("\n\n");
    // 9)
    printf("px = %p\n\n", px);
    int z;
    int *pz = &z;
    printf("pz = %p\n\n", pz);

    pc = &px;
    printf("Display &px byte after byte:\n");

    for (i = 0; i < sizeof(px); i++)
    {
        printf("pc = %p\t*pc = %X\n", pc + i, *(pc + i));
    }
    printf("\n\n");

    pc = py;

    printf("py = %p\n\n", py);

    printf("Display the dynamic allocations for an integer:\n");

    for (i = 0; i < sizeof(*py); i++)
    {
        printf("pc = %p\t*pc = %X\n", pc + i, *(pc + i));
    }

    free(py);

    return 0;
}
