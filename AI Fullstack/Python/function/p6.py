def merge_dicts(*dicts):
    result = {}
    dicts_len = len(dicts)
    if dicts_len == 0:
        return result
    for dict in dicts:
        for key, value in dict.items():
            result[key] = value
    return result


d1 = {"a": 1, "b": [1, 2]}
d2 = {"b": [3], "c": "hello"}
d3 = {"a": 10, "d": True}

merged = merge_dicts(d1, d2, d3)
print(merged)
# {'a': 10, 'b': [3], 'c': 'hello', 'd': True}

print(merge_dicts(d1))
# {'a': 1, 'b': [1, 2]}

print(merge_dicts())
# {}
