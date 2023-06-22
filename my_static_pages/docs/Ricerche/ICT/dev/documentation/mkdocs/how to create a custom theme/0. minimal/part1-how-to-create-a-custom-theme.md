# 1 - How to create a custom theme

## custom_theme

```txt
mkdocs.yml
docs/
    index.md
    about.md
custom_theme/
    main.html
		css
			index.css
```

## mkdocs.yml

```yaml
theme:
  name: null
  custom_dir: "custom_theme/"
  palette:
    primary: css/index.css
```

## main.html

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="{{ "css/index.css"|url }}" />
    <title>
      {% if page.title %}{{ page.title }} - {% endif %}{{ config.site_name }}
    </title>
  </head>

  <body>
    {{ page.content }}
  </body>
</html>
```

## Problem

> **_WAIT A MOMENT_**
>
> Why css are working only for index ???

```txt
http://localhost:8000/part2/

this           --> <link rel="stylesheet" href="css/index.css" />
will load this --> http://localhost:8000/part2/css/index.css

WARNING  -  [18:21:14] "GET /part2/css/index.css HTTP/1.1" code 404
```

## Solution

### mkdocs.yml

```yaml
theme:
  name: null
  custom_dir: "custom_theme/"
  palette:
    primary: css/index.css

extra_css:
  - css/index.css
```

### main.html

```diff
<!DOCTYPE html>
<html>
  <head>
-    <link rel="stylesheet" href="{{ "css/index.css"|url }}" />
+    {% for path in config.extra_css %}
+    <link href="{{ path|url }}" rel="stylesheet" />
+    {% endfor %}
    <title>
      {% if page.title %}{{ page.title }} - {% endif %}{{ config.site_name }}
    </title>
  </head>

  <body>
    {{ page.content }}
  </body>
</html>
```

### Example until now

![mkdocs-theme-init](mkdocs-theme-init.png)

### better index.css

```css
* {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  background-color: rgb(0, 0, 0, 0);
  color: whitesmoke;
  font-family: "Consolas", "Courier New", "Lucida Console", "Menlo", "Monaco",
    "Liberation Mono", "Ubuntu Mono", "DejaVu Sans Mono", "Roboto Mono",
    "Noto Mono", "Inconsolata", "Source Code Pro", "SF Mono", monospace;
  line-height: 1.1;
  font-size: 16px;
  font-style: normal;
}

html,
body {
  background-color: rgb(18, 18, 18);
  padding: 10px;
}

body {
  margin: 0 auto;
  max-width: 800px;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 30px;
}
h2 {
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 26px;
}
h3,
h4,
h5,
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 22px;
}

blockquote {
  padding: 10px;
  margin: 10px;
  background-color: rgb(0, 41, 82);
}

blockquote p,
blockquote strong em,
blockquote p strong em {
  color: rgb(242, 255, 103);
}

/* CODE */
pre {
  line-height: 0.7;
  background-color: rgba(255, 255, 255, 0.152);
  padding: 10px;
}

code {
  background-color: rgba(20, 20, 20, 0);
}

.vscode-light .hljs-comment,
.vscode-light .hljs-quote,
.vscode-light .hljs-number,
.vscode-light .hljs-class,
.vscode-light .hljs-variable {
  background-color: rgba(0, 128, 0, 0);
  color: rgb(0, 138, 0);
}
```

> **_PROBLEM_**
> code block has no highlighting.

### Possibilities

> **_NOTES:_**
> use two tabs for indent the list.

- <https://highlightjs.org/download/>
    - download
    - change the default.css file
- <https://squidfunk.github.io/mkdocs-material/getting-started/>

## highlightjs.js

Download and unzip.

### dir tree

```txt
mkdocs.yml
docs
custom_theme/
    main.html
		css
			index.css
		highlight
			styles
				default.min.css
			highlight.min.js
```

### mkdocs.yml

```yaml
site_name: Minimal Custom Dir Tree
use_directory_urls: true

theme:
  name: null
  custom_dir: "custom_theme/"
  palette:
    primary: css/index.css

extra_css:
  - css/index.css
  - highlight/styles/default.min.css

extra_javascript:
  - js/index.js
  - highlight/highlight.min.js
```

### main.html

```html
<!DOCTYPE html>
<html>
  <head>
    {% for path in config.extra_css %}
    <link href="{{ path|url }}" rel="stylesheet" />
    {% endfor %}
    <!-- -->
    {% block libs %}
    <link
      rel="stylesheet"
      href="{{ base_url }}/highlight/styles/default.min.css"
    />
    <script src="{{ base_url }}/highlight/highlight.min.js"></script>
    <script src="{{ base_url }}/js/index.js"></script>
    {% endblock %}

    <script>
      document.addEventListener("DOMContentLoaded", (event) => {
        // before css
        hljs.highlightAll();
      });
      document.addEventListener("load", function () {
        // after images and css
      });
    </script>

    <title>
      {% if page.title %}{{ page.title }} - {% endif %}{{ config.site_name }}
    </title>
  </head>

  <body>
    {{ page.content }}
  </body>
</html>
```

### modify default.min.css

```css
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}
code.hljs {
  padding: 3px 5px;
}
.hljs {
  background: #1c1c1c;
  color: #d3d3d3;
}
.hljs-comment {
  color: #00a321;
}
.hljs-punctuation,
.hljs-tag {
  color: rgba(120, 105, 255, 0.907);
}
.hljs-tag .hljs-attr,
.hljs-tag .hljs-name {
  color: #0090dd;
}
.hljs-attribute,
.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-name,
.hljs-selector-tag {
  font-weight: 700;
}
.hljs-addition {
  color: rgba(40, 255, 40, 0.792);
}
.hljs-deletion {
  color: rgba(255, 40, 40, 0.789);
}
.hljs-number,
.hljs-quote,
.hljs-selector-class,
.hljs-selector-id,
.hljs-string,
.hljs-template-tag,
.hljs-type {
  color: rgb(0, 227, 4);
}
.hljs-section,
.hljs-title {
  color: rgba(241, 209, 0, 0.932);
  font-weight: 700;
}
.hljs-link,
.hljs-operator,
.hljs-regexp,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-symbol,
.hljs-template-variable,
.hljs-variable {
  color: #ab5656;
}
.hljs-literal {
  color: #695;
}
.hljs-built_in,
.hljs-bullet,
.hljs-code {
  color: #397300;
}
.hljs-meta {
  color: #1f7199;
}
.hljs-meta .hljs-string {
  color: #38a;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-strong {
  font-weight: 700;
}
```
