# reminders

# git utils

```bash
git config --local user.name "Jakkins"
git config --local user.email "sjakkins@proton.me"
git config --local --list
git config --local http.proxy http://host:port
git config --local https.proxy http://host:port
git config --local --unset http.proxy
git config --local --unset https.proxy
```

# util links

- [Other themes](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes)

- [Plugins](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins)

- [PyPi - Python Packages](https://pypi.org/)

# mkdocs

## local debug python package

```python
python setup.py --help

# python setup.py build --clean --verbose --strict
# python setup.py install    deprecated      # automatically build and dist
# try to load the package inside a mkdocs project

# else, remove package
pip list
pip uninstall mkdocs-dark-minimal-dirtree
```

### debug job & how to install

```diff
- setup.py install is deprecated. Use build and pip and other standards-based tools.
```

```python
pip uninstall mkdocs-dark-minimal-dirtree
python setup.py sdist
pip install ./dist/mkdocs-dark_minimal_dirtree-0.0.1.tar.gz
```

## release python package

```python
# python setup.py register    deprecated

# python -m pip install --proxy http://<usr_name>:<password>@<proxyserver_name>:<port#> mkdocs-foo-plugin
# python -m pip install twine --user
python -m pip install twine

# python setup.py sdist bdist_wheel
python setup.py sdist

# to upload in https://pypi.org/
python -m twine upload dist/*
```

Overwrite the actual version:

```bash
python -m twine upload --skip-existing dist/*
```

## random windows error

```diff
- Installing collected packages: zipp, urllib3, rfc3986, Pygments, pkginfo, more-itertools, mdurl, idna, docutils, certifi, bleach, requests, readme-renderer, markdown-it-py, jaraco.classes, importlib-metadata, rich, requests-toolbelt, keyring, twine
- WARNING: Failed to write executable - trying to use .deleteme logic
- ERROR: Could not install packages due to an OSError: [WinError 2] Impossibile trovare il file specificato: 'C:\\Python311\\Scripts\\pygmentize.exe' -> 'C:\\Python311\\Scripts\\pygmentize.exe.deleteme'

+ pip install twine --user
```

## more python

```bash
pip install -U setuptools --user
pip install wheel --user
pip install Flask --user

# now you should be able to use
python setup.py bdist_wheel
```

# Sources, errors

## configuration file error

- <https://github.com/mkdocs/mkdocs-bootstrap/issues/17>

## "Package would be ignored" error with dir inside the theme

- <https://setuptools.pypa.io/en/latest/userguide/declarative_config.html#using-a-src-layout>
