# Setup simple minimal project

```txt
app
	main.py
	config.py
	config.ini
	db
		db.py
	apis
		garage.py
```

## main.py

```python
#!/usr/bin/env python3.7
from apis.garages import get_garages
import config
from db.db import DbObject, save_all

def main():
    configuration = config.get_configuration()
    garages = get_garages(configuration.proxy_conf)
    db_object: list[DbObject] = []
    for g in garages.results:
        db_object.append(g.toDbObject())
    save_all(db_object)

if __name__ == "__main__":
    main()
```

## config.ini && config.py

```ini
[PROXIES]
http=http://host.it:8080
https=http://host.it:8080
```

```python
import configparser
from dataclasses import dataclass

@dataclass
class RequestProxyConf:
    http: str | None
    https: str | None

    def asdict(self):
        return {'http': self.http, 'https': self.https}

parser = configparser.ConfigParser()
parser.read('config.ini')


def get_field(section, field):
    try:
        if (parser.has_option(section, field)):
            return parser.get(section, field)
    except:
        return None


@dataclass
class Configuration:
    proxy_conf: RequestProxyConf


def get_configuration():
    return Configuration(
        proxy_conf=RequestProxyConf(
            http=get_field("PROXIES", "http"),
            https=get_field("PROXIES", "https")
        )
    )
```

## garage.py

```python
from db.db import DbObject, IDbObject
import requests
from config import RequestProxyConf
import json

class ImmoRealEstate(IDbObject):
    title: str
    type: str

    def __init__(self, obj):
        self.title = obj["realEstate"]["title"]
        self.type = obj["realEstate"]["type"]
	
    def toDbObject(self):
        return DbObject(
            title=self.title,
            type=self.type
        )

class ImmoFirstLevel():
    count: int
    results: list[ImmoRealEstate] = []

    def __init__(self, text: str):
        json_obj = json.loads(text)
        self.count = json_obj["count"]
        it = self.results
        for res in json_obj["results"]:
            it.append(ImmoRealEstate(res))


def get_garages(proxy_servers: RequestProxyConf) -> ImmoFirstLevel:
    url = "https://www.some.api"
    payload = {}
    headers = {}
    response = requests.request(
        "GET", url, headers=headers, data=payload, proxies=proxy_servers.asdict())
    return ImmoFirstLevel(response.text)
```

## db.py

```python
from abc import ABCMeta, abstractmethod
from dataclasses import dataclass

@dataclass
class DbObject:
    title: str
    type: str
    description: str = ""
    date: str = ""
    cost: str = ""
    contract_type: int = -1

class IDbObject:
    __metaclass__ = ABCMeta

    @classmethod
    def version(cls): return "1.0"
    
    @abstractmethod
    def toDbObject(self) -> DbObject: raise NotImplementedError
    
def save_all(objects: list[DbObject]):
    print(objects)
```
