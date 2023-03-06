# 5 - MkDocs css, js, styles and things

## state right now

```txt
custom_theme
  main.html
  css
    index.css
  nav
    nav.html
  content
    index.html
docs
  index.md
  dir0
    part1.md
    part2.md
    dir1
      index.md
mkdocs.yml
```

## mkdocs.yml

```yml
site_name: Minimal Custom Dir Tree
use_directory_urls: true

theme:
  name: null
  custom_dir: "custom_theme/"

extra_css:
  - css/index.css
  - highlight/styles/default.min.css

extra_javascript:
  - js/index.js
  - highlight/highlight.min.js
```

## main.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {% for path in config.extra_css %}
	<link href="{{ path|url }}" rel="stylesheet" />
	{% endfor %}
  {% block libs %}
	<link rel="stylesheet" href="{{ base_url }}/highlight/styles/default.min.css">
	<script src="{{ base_url }}/highlight/highlight.min.js"></script>
	<script src="{{ base_url }}/js/index.js"></script>
	{% endblock %}
</head>
<body>
	{% include 'nav/nav.html' %}
	{% include 'content/index.html' %}
</body>
</html>
```

## nav.html

```html
{%- block site_nav %}
<nav>
  <ul class="nav">
    {%- set navlevel = 1 %}
    {%- for nav_item in nav %}
    {% include 'nav/nav-item.html' %}
    {%- endfor %}
  </ul>
</nav>
{%- endblock %}
```

## nav-item

```html
{% if nav_item.is_page  %}
<li class="nav-page">
	<a href="{{ base_url }}/{{ nav_item.url }}">{{ nav_item.title }}</a>
</li>
{% endif %}

{% if nav_item.is_section %}
<li id="section" class="section noselect collapsed">
	<span>{{ nav_item.title }}</span>
</li>
{% endif %}

<!-- if nav_item has children -->
{%- if nav_item.children %}
<li class="children">
	<ul>
		{%- set navlevel = navlevel + 1 %}
		{%- for nav_item in nav_item.children %}
		{% include 'nav/nav-item2.html' %}
		{%- endfor %}
		{%- set navlevel = navlevel - 1 %}
	</ul>
</li>
{% endif %}
```

## index.js

```javascript
/* 
  this script add a listener to every section where on user click
  the collapsed class is toggled (removed and inserted if missing)
*/
window.addEventListener("load", function (event) {
  let nodelist = this.document.getElementsByClassName("section");
  for (var i = 0, len = nodelist.length; i < len; i++) {
    nodelist[i].addEventListener(
      "click",
      function (event) {
        event.target.classList.toggle("collapsed");
      },
      false
    );
  }
});
```

## index.css

```css
/* ----------------------------------- */
/* =============== NAV =============== */
/* ----------------------------------- */

.children {
  list-style: none;
}

.section {
  list-style: none;
  cursor: pointer;
  padding: 10px 0px;
}

.section span {
  /* unclickable span */
  pointer-events: none;
}

.section::before {
  content: "-";
}

.section.collapsed::before {
  content: "+";
}

/* hide the items */
.section.collapsed + .children {
  display: none;
}

/* show the items */
.section + .children {
  display: block;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.nav-page {
  padding: 2px 0px;
}

.nav-page a {
  text-decoration: none;
}
```

## It's working but...

> ***PROBLEM*** on page change the menu closes

