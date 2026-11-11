t = (5, 2, 8, 2)
first, *rest = t  # first = 5, rest = (2, 8, 2)
print(first, rest)  # 5, (2, 8, 2)
print(sorted(t))  # [2, 2, 5, 8]
print(2 in t, 9 not in t)  # True, True

s = set(t)  # s = {5, 8, 2}
print(len(s))  # 3
s2 = {2, 8, 10}
print(s & s2, s | s2)  # {2, 8}, {2, 5, 8, 10}
