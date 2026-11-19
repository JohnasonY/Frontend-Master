class A:
    def __call__(self):
        print("A called")

class B(A):
    def __call__(self):
        print("B called")
        super().__call__()

b = B()
b()