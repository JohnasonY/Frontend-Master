# 2. Automatically Register Subclasses
# Write a metaclass called PluginMeta that automatically registers any subclass of Plugin in the PluginMeta.registry dictionary, where the key is the class name and the value is the class itself.

class PluginMeta(type):
    registry = {}
    # need to rewrite __new__ because it affects the class creation flow
    def __new__(cls, name, bases, namespace):
        new_cls = super().__new__(cls, name, bases, namespace)
        if name != "Plugin":
            cls.registry[name] = new_cls
        return new_cls
    pass

class Plugin(metaclass=PluginMeta):
    pass

class ImagePlugin(Plugin):
    pass

class TextPlugin(Plugin):
    pass

print(PluginMeta.registry)
# Expected output:
# {'ImagePlugin': <class '__main__.ImagePlugin'>, 'TextPlugin': <class '__main__.TextPlugin'>}