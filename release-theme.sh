#!/bin/bash
rm -r ./dist
rm mkdocs_dark_enhanced_dirtree.egg-info
python setup.py sdist
python -m twine upload dist/*