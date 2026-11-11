while True:
    start_int = input("Enter the starting integer: ")
    start_int = int(start_int)
    if start_int < 0:
        print("Starting integer must greater than 0!")
        continue
    break

while True:
    end_int = input("Enter the ending integer: ")
    end_int = int(end_int)
    if end_int <= start_int:
        print("Ending integer must greater than starting integer!")
        continue
    break

print(f"The prime numbers between {start_int} and {end_int}: ")
current_int = start_int
prime_count = 0
while current_int <= end_int:
    # check whether current_int is a prime number
    current_divisor = 2
    while current_divisor < current_int:
        if current_int % current_divisor == 0:
            break
        else:
            current_divisor += 1
    else:
        print(f"{current_int} ", end="")
        prime_count += 1
    current_int += 1
print()
print(f"A total of {prime_count} prime numbers")
