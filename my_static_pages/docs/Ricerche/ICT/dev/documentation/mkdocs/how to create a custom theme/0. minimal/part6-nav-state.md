# 6 - Nav State

## What is happening?

Now we setted every page to be an `<a href:"...">` element.
In static page generation it's normal to reset the state on every refresh.

- Do MkDocs have something to help with this behaviour?
  - https://github.com/squidfunk/mkdocs-material

### Ideas

- mkdocs nav collapse on page change
- mkdocs refresh content without reload page

## Solution 1 - ChatGPT solved this with an embarrassing solution

I can call my site with a `XMLHttpRequest` and get the page than parse it to get only the content.

So I changed the `index.html` 

```diff
<div id="page_content" class="content">
    {{ page.content }}
+   <br id="parse-me-away"/>
</div>
```

### index.js

```javascript
window.addEventListener("load", function (event) {
  let pages_nodelist = this.document.getElementsByClassName("nav-page");
  for (var i = 0, len = pages_nodelist.length; i < len; i++) {
    pages_nodelist[i].addEventListener(
      "click",
      function (event) {
        let page_content = document.getElementById("page_content");
        page_content.innerHTML = "";
        var xhr = new XMLHttpRequest(); // create new XMLHttpRequest object
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let content = xhr.responseText.split(
              '<div id="page_content" class="content">'
            )[1];
            content = content.split("<br id=\"parse-me-away\"/>")[0]
            document.getElementById("page_content").innerHTML = content; // update DOM with response
            hljs.highlightAll();
          }
        };
        let a_el_page = event.target.firstElementChild; // HTMLAnchorElement
        xhr.open("GET", a_el_page.pathname, true); // open the request with the GET method
        xhr.send(); // send the request
      },
      false
    );
  }
});
```

> Is it a shitty solution? yes.
> 
> Am I content with it? yes.
> 
> Am I going to find another solution? no.
>
> ***THE END***

P.S. I did find a better solution :3
