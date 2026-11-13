call_count = 0


def process_data(data):
    # 处理完成后递增计数器
    global call_count
    result = sum(data)
    call_count += 1
    return result


print(process_data([1, 2, 3]))
print(process_data([4, 5, 6]))
print(f"being called in a total of {call_count} times")
