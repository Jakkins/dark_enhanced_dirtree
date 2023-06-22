# Keywords

- type hint
- type check
    - the most pythonic way to check the type of an object is... Not to check it. `But I don't give a damn and I want type check`.

# structs

## dictionary

```python
{
	"id": 13, 
	"title": "the title", 
	"info": "some info"
}
```

## object, aka class

```python
@dataclass
class ProxyConf:
    http: str = None   # default value for http
    https: str = None

ProxyConf(http='http://host.it:8080', https='http://host.it:8080')
```
