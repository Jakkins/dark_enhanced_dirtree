# 3 - Near a wholesome documentation

> **_PROBLEM_**
>
> `<ul>` not working correctly.

## GOAL

At this point we have this `main.html` file:

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

Now, I want to add a dynamic lateral navigation system that adapt to all files and directories inside docs folder.
And I have to do this using what mkdocs offers me.

### Randomly adjust some css of course and some other trick... of course

```css
code,
code * {
  font-weight: lighter, normal;
  line-height: 1.5;
  font-size: 14px;
}
```

```html
<head>
  <!-- add this -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
```

### Now what?

ChatGPT said to me that this type of code:

```txt
{% extends "base.html" %}

{% block htmltitle %}
  <title>Lorem ipsum dolor sit amet</title>
{% endblock %}
```

Is similar to, or is, Django templating language.

Can I list all files and directories inside docs directory?

Maybe a <a href="https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins" target="_blank">plugin?</a>

But...

```yaml
theme:
  name: readthedocs
  navigation_depth: 2
```

`readthedocs` already do this...

# check other themes

Aaaaaannndddd... What the hell is [this](https://github.com/readthedocs/sphinx_rtd_theme/blob/master/sphinx_rtd_theme/layout.html#L164):

```html
{%- block navigation %} {#- Translators: This is an ARIA section label for the
main navigation menu -#}
<div
  class="wy-menu wy-menu-vertical"
  data-spy="affix"
  role="navigation"
  aria-label="{{ _('Navigation menu') }}"
>
  {%- block menu %} {%- set toctree =
  toctree(maxdepth=theme_navigation_depth|int,
  collapse=theme_collapse_navigation|tobool,
  includehidden=theme_includehidden|tobool,
  titles_only=theme_titles_only|tobool) %} {%- if toctree %} {{ toctree }} {%-
  else %}
  <!-- Local TOC -->
  <div class="local-toc">{{ toc }}</div>
  {%- endif %} {%- endblock %}
</div>
{%- endblock %}
```

> **_WAIT A MOMENT_**
>
> What is toctree?
>
> Why I don't know nothing about it?

I'll check also how [this](https://github.com/noraj/mkdocs-windmill-dark) theme works.

```html
<nav class="nav-main">
  {%- block site_nav %}
  <ul>
    {%- set navlevel = 1 %}
    <!-- what language is this LOL -->
    {%- for nav_item in nav %}
    <li><span>{{ nav_item.title }}</span></li>
    {%- endfor %}
  </ul>
  {%- endblock %}
</nav>
```

ChatGPT said to me:

```txt
The code snippet "{%- for nav_item in nav %}" is a template language construct that is used in the context of a loop in some templating engines like Jinja2.
```

> I already saw Jinja2.
>
> What the hell is Jinja2?

Ok... So...

> MkDocs uses Jinja2 as its default templating engine.

It wasn't written like that .-.
