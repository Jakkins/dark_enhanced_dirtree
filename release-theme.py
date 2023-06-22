#!/usr/bin/env python
import os
import shutil
import subprocess

ABSPATH = os.path.realpath(os.path.dirname(__file__))
os.chdir(ABSPATH)
dist_path = os.path.join(ABSPATH, "dist")
egg_file = os.path.join(ABSPATH, "mkdocs_dark_enhanced_dirtree.egg-info")
try:
    if os.path.exists(dist_path):
        shutil.rmtree(dist_path)
except Exception as e:
    print(e)
try:
    if os.path.exists(egg_file):
        os.remove(egg_file)
except Exception as e:
    print(e)
subprocess.run(["python", "setup.py", "sdist"])
subprocess.run(["python", "-m", "twine", "upload", "dist/*"])
