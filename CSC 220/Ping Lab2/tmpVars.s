	.text
	.global	_main			//to make main the starting point and globally accessed
_main:
	sub	sp, sp, #16	 
	movz	w0, #97  		//w0 = x = 97	

	str	w0, [sp, #12]		 // store x to memory address at [sp + 12]
                            //str works on a word. x is int type, 4 bytes.

	movz	w0, #65			//w0 = ch1 = ‘A’
	strb	w0, [sp, #11]		//store ch1 to memory address at [sp + 12]
						//strb works on a byte. ch1 is char type

	movz	w0, #98			// w0 = y = 98
	str	w0, [sp, #4]	
	
	movz	w0, #66
	strb	w0, [sp, #3]		//w0 = ch2 = ‘B’

	movz	w0, #69			//w0 = uc1 = ‘E’
	strb	w0, [sp, #2]	


	ldr	w0, [sp, #12]	// ch1 = x; load x’s 4 bytes from memory to w0

	strb	w0, [sp, #11]		// store a byte of x to memory??

	ldr	w0, [sp, #4]		// ch2 = y; load y’s 4 bytes from memory to w0

	strb	w0, [sp, #3]	//store a byte of y to memory??

	movz	w0, #81
	strb	w0, [sp, #2]
		

	ldr	w0, [sp, #12]
	add	w0, w0, #3		//x += 3;
	str	w0, [sp, #12]


	ldr	w0, [sp, #4]
	add	w0, w0, #3     		//    y += 3;
	str	w0, [sp, #4]

	movz	w0, #0
	add	sp, sp, #16  		// restore sp
	ret
