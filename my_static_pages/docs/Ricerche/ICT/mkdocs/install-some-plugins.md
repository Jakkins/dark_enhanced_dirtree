# How to install some plugins

## Basic mkdocs project

```txt
mkdocs.yml
docs
	index.md
```

## how to install a plugin (mkdocs-mermaid2-plugin)

### upgrade tools

```bash
python -m pip install --upgrade pip --user
python -m pip install --upgrade setuptools --user

# pip with proxy 
python -m pip install --proxy http://host:8080 --upgrade pip --user
```

### download the plugin

```bash
python -m pip install mkdocs-mermaid2-plugin --user

# pip with proxy 
python -m pip install --proxy http://host:8080 mkdocs-mermaid2-plugin --user
```

#### if behind firewall

```bash
python -m pip install --proxy http://host:8080 mkdocs-mermaid2-plugin --user --no-build-isolation
```

### edit mkdocs.yml

```yml
plugins:
  - search:
      min_search_length: 1
  - mermaid2:
      arguments:
        theme: "dark"
        startOnLoad: true

extra_javascript:
  - https://unpkg.com/mermaid@8.7.0/dist/mermaid.min.js
```

> ***WARN***
>
> Also index.html needs to be modified

### edit index.html or main.html

Add this:

```html
<script src="https://unpkg.com/mermaid@8.7.0/dist/mermaid.min.js"></script>
```

# mermaid sources

- github.com/fralau/mkdocs-mermaid2-plugin
- mermaid.js.org/ecosystem/integrations.html#document-generation
- cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js
