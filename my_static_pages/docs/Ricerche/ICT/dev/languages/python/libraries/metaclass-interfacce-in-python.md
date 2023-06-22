# Interfacce in python

[import abc: ABCMeta vs ABC TLDR none difference](https://stackoverflow.com/questions/33335005/is-there-any-difference-between-using-abc-vs-abcmeta)

## How to use

db.py

```python
@dataclass
class DbObject:
    title: str
    type: str
    description: str = ""
    date: str = ""
    cost: str = ""
    contract_type: int = -1

class IDbEntity(metaclass=ABCMeta):

    @classmethod
    def version(cls): return "1.0"
    
    @abstractmethod
    def get_data(self) -> list[DbObject]: raise NotImplementedError
```

myentity.py

```python
class MyEntity(IDbEntity):

    def __init__(self):
        pass

    def get_data(self) -> list[DbObject]:
        url = "https://www.some.api"
        payload = {}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        entities = MyEntityObj(response.text)
		return entities
```
