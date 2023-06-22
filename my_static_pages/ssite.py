#!/usr/bin/env python
from glob import glob
import shutil
import sys
import os

static_page_repo = "jakkins.github.io"


def print_help():
    print("args supported:")
    print("- goprod")
    print("- serve")
    print("- fullprod")
    print()
    print("example: site serve")
    sys.exit(1)


if len(sys.argv) == 1:
    print_help()

ABSPATH = os.path.realpath(os.path.dirname(__file__))

if sys.argv[1] == "serve":
    os.chdir(ABSPATH)
    os.system("python -m mkdocs serve")

if sys.argv[1] == "fullprod":
    print()
    print("--- docs changes")
    os.chdir(ABSPATH)
    os.system("git add .")
    os.system('git commit -m "docs change"')
    os.system("git push")
    
if sys.argv[1] == "goprod" or sys.argv[1] == "fullprod":
    print()
    print("--- going prod")
    os.chdir(ABSPATH)
    os.system("python -m mkdocs build")
    os.chdir(f"../../{static_page_repo}")
    # delete all files and directories inside your "static_page_repo" excluding .git and readme.md
    files = glob("*")
    for file in files:
        if file not in [".git", "readme.md"]:
            if os.path.isdir(file):
                shutil.rmtree(file)
            else:
                os.remove(file)
    src_dir = "../dark_enhanced_dirtree/my_static_pages/site/"
    dst_dir = "./"
    for dirpath, dirnames, filenames in os.walk(src_dir):
        # Iterate over the directories and move each one to the destination directory
        for dirname in dirnames:
            src_path = os.path.join(dirpath, dirname)
            dst_path = src_path.replace(src_dir, dst_dir, 1)
            shutil.move(src_path, dst_path)
        # Iterate over the files and move each one to the destination directory
        for filename in filenames:
            src_path = os.path.join(dirpath, filename)
            dst_path = src_path.replace(src_dir, dst_dir, 1)
            shutil.move(src_path, dst_path)
    os.system("git add .")
    os.system('git commit -m "goprod"')
    os.system("git push origin main --force")
