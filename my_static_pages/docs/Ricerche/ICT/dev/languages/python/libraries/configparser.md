# Best practices to import a config file

## configparser

view

```txt
app
    config.ini
		config.py
		main.py
```

config.ini

```ini
[PROXIES]
http=http://host.it:8080
https=http://host.it:8080
```

config.py

```python
import configparser

parser = configparser.ConfigParser()
parser.read('config.ini')

def get_field(section, field):
    try:
        if(parser.has_option(section, field)):
           return parser.get(section, field)
    except:
        return None
        
def get_configuration():
    return {
        "http": get_field("PROXIES", "http"),
        "https": get_field("PROXIES", "https"),
    }
```

main.py

```python
import config
import requests

def main():
    configuration = config.get_configuration()
    proxy_servers = {}
    if(configuration['http']):
        proxy_servers["http"] = configuration["http"]
    if(configuration['https']):
        proxy_servers["https"] = configuration["https"]

    url = "https://www.some.api"
    payload = {}
    headers = {}
    response = requests.request(
        "GET", url, headers=headers, data=payload, proxies=proxy_servers)
    print(response.text)

if __name__ == "__main__":
    main()
```
