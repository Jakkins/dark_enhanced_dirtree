# Search a word inside all files of a dir

```python
import sys

sys.path.append("c:\\python311\\lib\\site-packages")
sys.path.append(
    "C:\\Users\\{username}\\AppData\\Roaming\\Python\\Python311\\site-packages"
)

import os
import chardet
from termcolor import colored
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
	print("\n\nPlease specify an absolute path for a directory.\n\n", file=sys.stderr)
	parser.print_help()
	exit(1)

def search_in_dir(dir_path):
	unicoded_file_number = 0
	directory = os.listdir(dir_path)
	for fname in directory:
		absolute_path = dir_path + os.sep + fname
		if os.path.isdir(absolute_path):
			search_in_dir(absolute_path)
		if os.path.isfile(absolute_path):
			# get file encoding system
			try:
					with open(absolute_path, "r") as f:
							if searchstring in f.read():
								print(colored('\nfound in %s' % dir_path, 'green'))
								print(fname)
			except IOError:
					print("could not read", absolute_path)
			except UnicodeDecodeError:
				unicoded_file_number += 1
				"""
				with open(absolute_path, "rb") as f:
					encoding = chardet.detect(f.read())['encoding']
					print("this file contains unicoded chars", absolute_path, encoding)
				"""

while True:
	print(colored("\n=======================================\n", 'yellow'))
	print(colored("============= WORD FINDER =============\n", 'yellow'))
	print(colored("=======================================\n", 'yellow'))
	searchstring = input('Insert a word to find: ')
	search_in_dir(args.dir_path)
```
