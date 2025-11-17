1. Write a regular expression to match a mobile phone number
   Must be 11 digits long
   The first digit must be 1

    ^1[0-9]{10}$

2. A name must be 3–6 English characters

    ^[a-zA-z]{3,6}$

3. A password must be 6–12 characters long, and can only contain numbers, letters, or underscores

    ^[a-zA-z0-9_]{6,12}$

4. Write a regular expression to match an email address
   Format: xxxxxx@xxxxx.xxxx.xxxx

    ^.{1,}@.{1,}(\..{1,}){1,}$

5. Match a landline phone number
   Format: xxx-xxxxxxxx
   The first part: 1–3 digits
   The second part: 4–8 digits

    ^[0-9]{1,3}-[0,9]{4,8}$

6. Match a positive number

    ^[0-9]{1,}(\.{0,1}[0-9]{1,}){0,1}$

7. Match a decimal number

    ^\-{0,1}[0-9]{1,}\.[0-9]{1,}$

8. Match an integer
   
   ^-{0,1}0{0,}[0-9]{1,}$