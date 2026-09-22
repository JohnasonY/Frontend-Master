.text 
.global _main 
_main:
sub sp, sp, #48		 
str wzr, [sp, #44] 	// 1. store 0 to sp + 44 ~ sp + 47, 4 bytes

movz x0, 0x1718		//1718 takes 0-15 bits in X0
movk x0, 0x1516, lsl #16	//1516 takes bits 16-31
movk x0, 0x1314, lsl #32	//1314 takes bits 32-47
movk x0, 0x1112, lsl #48	//1112 takes bits 48-63
str x0, [sp, #8] 		// 2. store 0x1112131415161718 in sp+8 ~ sp+15, 8 bytes
 

movz x0, 0x6789		//
movk x0, 0x2345, lsl #16	//
movk x0, 0xef01, lsl #32	//
movk x0, 0xabcd, lsl #48	// 
str x0, [sp] 			// 3.  
 
add x0, sp, #8			// 
str x0, [sp, #32] 		// 4.  
 
mov x0, sp 			//
str x0, [sp, #24] 		// 5.  
loop: ldr w0, [sp, #44]   	// 
cmp w0, #7		 	// 
bgt exit 			//if w0 > 7, go to the instruction with label exit.  
 
ldr x0, [sp, #32]   		// x0 =  
ldrb w0, [x0]  			// w0 =  
strb w0, [sp, #23]  		// 6.  
 
ldr x0, [sp, #24]  		// x0 =  
ldrb w0, [x0]      		// w0 =  
strb w0, [sp, #22] 		// 7.  

ldrb w1, [sp, #23] 	//w1 =
ldrb w0, [sp, #22] 	//w0 =
eor w0, w1, w0 	//w0 =  
strb w0, [sp, #23] 	// 8.  
ldr x0, [sp, #32] 	//x0 =  
ldrb w1, [sp, #23] 	//w1 =  
strb w1, [x0] 		// 9.  

 ldr x0, [sp, #32] 	// x0 =  
 add x0, x0, #1		// x0 =  
 str x0, [sp, #32]  	// 10. 

 ldr x0, [sp, #24] 	//
 add x0, x0, #1		//
 str x0, [sp, #24]  	// 11. 
 
 ldr w0, [sp, #44] 
 add w0, w0, #1
 str w0, [sp, #44] 	// 12.  
 b loop 	

//The data in sp + 44 is from 0 to 7 in each iteration. When the data becomes 8, the execution //goes to the label exit.

exit: mov w0, 0
add sp, sp, 48 
ret
