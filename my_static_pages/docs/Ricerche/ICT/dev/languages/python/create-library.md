# Create a library

## Simple library

```txt
main.py
mylib.py
```

### mylib.py

```python
def say_hi():
	print("Hi!)
```

### main.py

modo 1:

```python
import mylib
mylib.say_hi()
```

modo 2:

```python
import say_hi from mylib
say_hi()
```

## Serious library

- <https://medium.com/analytics-vidhya/how-to-create-a-python-library-7d5aea80cc3f>
