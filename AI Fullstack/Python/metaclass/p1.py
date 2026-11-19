# 1. Implement a Singleton Metaclass
# Write a metaclass called SingletonMeta that automatically makes any class using this metaclass follow the Singleton design pattern.

class SingletonMeta(type):
    _instance = {}

    # need to rewrite __class__ because it affects object creation flow
    def __call__(cls, *args, **kwds):
        if cls not in cls._instance:
            ins = super().__call__(*args, **kwds)
            cls._instance[cls] = ins
        return cls._instance[cls]
    
    pass

class Database(metaclass=SingletonMeta):
    def __init__(self, host):
        self.host = host

db1 = Database("localhost")
db2 = Database("remote")
print(db1 is db2)  # Should output True
print(db1.host)    # Should output localhost

class Player(metaclass=SingletonMeta):
    pass


p1 = Player()
p2 = Player()

print(p1 is p2)