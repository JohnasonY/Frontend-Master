# 1. Implement a Counter Class
# Write a Counter class that meets the following requirements:
# 1. Accept an initial value when creating an instance.
# 2. Increment the counter by 1 each time the instance is called.
# 3. Provide a reset() method to reset the counter to its initial value.
# 4. Provide a get() method to retrieve the current counter value.
# Example usage:
# c = Counter(10)
# print(c())      # 11
# c()             # 12
# print(c.get())  # 12
# c.reset()
# print(c.get())  # 10

class Counter:
    def __init__(self, initial):
        self.initial = initial
        self.current = initial

    def __call__(self, *args, **kwds):
        self.current += 1

    def reset(self):
        self.current = self.initial

    def get(self):
        return self.current

c = Counter(10)
print(c())      # 11
print(c.get())
c()             # 12
print(c.get())  # 12
c.reset()
print(c.get())  # 10