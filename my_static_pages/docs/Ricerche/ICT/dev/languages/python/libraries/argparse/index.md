# ArgumentParser

```python
import sys

sys.path.append("c:\\python311\\lib\\site-packages")
sys.path.append(
    "C:\\Users\\{username}\\AppData\\Roaming\\Python\\Python311\\site-packages"
)

import os
from argparse import ArgumentParser

def dir_path(string):
    if os.path.isdir(string):
        return string
    else:
        raise NotADirectoryError(string)

parser = ArgumentParser()
parser.add_argument("-d", "--dir-path", type=dir_path)
args, leftovers = parser.parse_known_args()
if args.dir_path is None:
	print("\n\nPlease specify a directory.\n\n", file=sys.stderr)
	parser.print_help()
	# import logging
	# logging.error("Please specify a directory.", exc_info=True)
	exit(1)
```
