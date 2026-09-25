.text 
.global _main 
_main: 
sub sp, sp, #64 
movz x0, 0x8899 
movk x0, 0xeeff, lsl  #16 
movk x0, 0xccdd, lsl  #32 
movk x0, 0x7abb, lsl  #48 
str x0, [sp, #24] 
movz x0, 0x7788 
movk x0, 0x5566, lsl 16 
movk x0, 0x3344, lsl 32 
movk x0, 0x1122, lsl 48 
str x0, [sp, #48] 
mov x0, sp 	//or add x0, sp, xzr 
add x0, x0, #24 
str x0, [sp, #40] 
movz w0, #65 
strb w0, [sp, #39] 
movz w0, #66 
strb w0, [sp, #38] 
mov x0, sp 
movz x1, #3 
ldr x2, [x0, x1, lsl #3] 
ldr x3, [x0, #48] 
cmp x3, x2 
b.ge L1 
ldr x0, [sp, #24] 
sub x0, x0, #0x56 
str x0, [sp, #24] 
L1: ldr x0, [sp, #40] 
ldr x0, [x0] 
strb w0, [sp, #39] 
ldr x0, [sp, #48] 
strb w0, [sp, #38] 
ldrb w0, [sp, #39] 
ldrb w1, [sp, #38] 
movz w0, #0 
add sp, sp, #64 
ret
