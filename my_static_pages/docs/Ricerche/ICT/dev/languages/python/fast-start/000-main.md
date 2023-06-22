# Main

## Basics

1. update VScode, download from [here](https://code.visualstudio.com/)

## Extensions

- Python
- Pylance

## Libs

```bash
/bin/python -m pip install -U autopep8          # code formatter
```

# Code

```python
import sys

def main(argv, arc):
    print(argv, arc)

if __name__ == '__main__':
    main(sys.argv, len(sys.argv))
```
