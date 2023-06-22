# 4 - Jinja2

<a href="https://palletsprojects.com/p/jinja/" target="_blank">easier start</a> <br>
<a href="https://jinja.palletsprojects.com/en/latest/" target="_blank">docs</a>

## GOAL

> list files and directories inside nav. (no "page", no links)

Also

> Jinja2 template engine that comes with MkDocs is not pure Jinja2 because there is no python involved.

# MkDocs's Jinja2

## index.html

```html
<body>
  {% include 'nav-main.html' %}
  {{ page.content }}
</body>
```

## nav-main.html & how to debug

```html
{%- block site_nav %}
<nav class="nav-main">
  <ul>
    {%- set navlevel = 1 %}
    <!---->
    {%- for nav_item in nav %}
    <script>
      // debug nav_item
      console.log("{{ nav_item }}");
    </script>
    {%- endfor %}
  </ul>
</nav>
{%- endblock %}
```

## check if dir

```html
{%- block site_nav %}
<nav class="nav-main">
  <ul>
    {%- set navlevel = 1 %} 
    {%- for nav_item in nav %} 
    {% include 'nav-item.html' %} 
    {%- endfor %}
  </ul>
</nav>
{%- endblock %}
```

### nav-item.html with more debug

> comments: <!---> are a problem with Jinja2

```html
<script>
	console.log("{{ nav_item }}")
</script>

{% if nav_item.url %}
<li>
	<a href="{{ nav_item.url }}">url --- {{ nav_item.title }}</a>
</li>
{% endif %}

{% if nav_item.is_page  %}
<li>
	<a href="{{ nav_item.url }}">page --- {{ nav_item.title }}</a>
</li>
{% endif %}

{% if nav_item.is_link %}
<li>
	<a href="{{ nav_item.url }}">link --- {{ nav_item.title }}</a>
</li>
{% endif %}

{% if nav_item.is_section %}
<li>
	<a href="{{ nav_item.url }}">section --- {{ nav_item.title }}</a>
</li>
{% endif %}
```

# Legenda

```txt
page    : the title in the first line of every md file
section : the directory name inside docs dir
```

> The order is by filename and not by title!
>
> This is good because you can name every file like:
>
> - 000.md
>
> - 001.md
>
> But you can always change title as you want:
>
> - 000.md
>
>     - Home
>
> - 0001.md
>
>     - part1

## Example

```txt
docs
  index.md
    (# Home)
  dir1
    index2.md
      (# Part1)
  dir2
    image.jpg
```

```html
<script>
	console.log("{{ nav_item }}")
</script>

{% if nav_item.is_page  %}
<li>
	<a href="{{ base_url }}/{{ nav_item.url }}">{{ nav_item.title }}</a>
</li>
{% endif %}

{% if nav_item.is_section %}
<li>
	<span>{{ nav_item.title }}</span>
</li>
{% endif %}

<!-- if nav_item has children -->
{%- if nav_item.children %}
<li>
	<ul>
		{%- set navlevel = navlevel + 1 %}
		{%- for nav_item in nav_item.children %}
		{% include 'nav-item2.html' %}
		{%- endfor %}
		{%- set navlevel = navlevel - 1 %}
	</ul>
</li>
{% endif %}
```

## Results

```html
- Home
- dir1
  - Part1
```

> Only directories with md file inside are taken into consideration.
