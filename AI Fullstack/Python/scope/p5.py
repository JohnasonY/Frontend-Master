def create_account(initial_balance):
    curr_balance = initial_balance

    def deposit(amount):
        nonlocal curr_balance
        curr_balance += amount
        return curr_balance

    def withdraw(amount):
        nonlocal curr_balance
        updated_balance = curr_balance - amount
        if updated_balance < 0:
            return "not enough balance"
        else:
            curr_balance = updated_balance
            return curr_balance

    return deposit, withdraw


deposit, withdraw = create_account(100)
print(deposit(50))  # 150
print(withdraw(30))  # 120
print(withdraw(200))  # 余额不足
