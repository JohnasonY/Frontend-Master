def flatten(list):
    result = []
    for item in list:
        if type(item) == type([]):
            result += flatten(item)
        else:
            result.append(item)
    return result


nested1 = [1, [2, 3], [[4], 5]]
print(flatten(nested1))  # [1, 2, 3, 4, 5]

nested2 = [[[1]], 2, [3, [4, [5]]]]
print(flatten(nested2))  # [1, 2, 3, 4, 5]

print(flatten([]))  # []
print(flatten([1, 2, 3]))  # [1, 2, 3]
