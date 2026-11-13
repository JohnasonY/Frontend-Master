def to_linked_list(list):
    list_len = len(list)
    if list_len == 0:
        return None
    return {"value": list[0], "next": to_linked_list(list[1:])}


linked1 = to_linked_list((1, 2, 3))
print(linked1)
# {'value': 1, 'next': {'value': 2, 'next': {'value': 3, 'next': None}}}

linked2 = to_linked_list([10, 20])
print(linked2)
# {'value': 10, 'next': {'value': 20, 'next': None}}

print(to_linked_list([]))  # None
