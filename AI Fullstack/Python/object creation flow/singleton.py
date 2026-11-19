class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance == None:
            # create an instance
            cls._instance = super().__new__(cls)
        return cls._instance


instance1 = Singleton()
instance2 = Singleton()

print(id(instance1), id(instance2))
print(instance1 is instance2)