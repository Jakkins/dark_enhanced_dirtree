# Parse json

## from text to json simple way

```python
#!/usr/bin/env python3.7
import requests
import json

# https://stackoverflow.com/questions/48254562/python-equivalent-of-typescript-interface
# https://dataclass-wizard.readthedocs.io/en/latest/#installation

class Garage():
    count: int
    results: list[object]

    def __init__(self, text):
        json_obj = json.loads(text)
        self.count = json_obj.get("count", 0)
        self.results = json_obj.get("results", [])

def get_garages():
    url = "https://www.some.api"
    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    return Garage(response.text)

def main():
    garages = get_garages()
    print(garages.count)


if __name__ == "__main__":
    main()
```
