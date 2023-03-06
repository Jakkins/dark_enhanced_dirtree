(function () {
  console.log("ready");
})();

let last_active_nav_el = null;

function setActive(target) {
  console.log("setActive", target);
  if (last_active_nav_el !== null) {
    last_active_nav_el.classList.toggle("active");
  }
  target.classList.toggle("active");
  last_active_nav_el = target;
}

window.addEventListener("load", function (event) {
  /**
   * dirtree functionality === css + js
   */
  let sections_nodelist = this.document.getElementsByClassName("section");
  for (var i = 0, len = sections_nodelist.length; i < len; i++) {
    sections_nodelist[i].addEventListener(
      "click",
      function (event) {
        event.target.classList.toggle("collapsed");
      },
      false
    );
  }

  /**
   * change page without refresh functionality
   */
  let pages_nodelist = this.document.getElementsByClassName("nav-page");
  for (var i = 0, len = pages_nodelist.length; i < len; i++) {
    pages_nodelist[i].addEventListener(
      "click",
      function (event) {
        setActive(event.target);
        let page_content = document.getElementById("page_content");
        page_content.innerHTML = "";
        var xhr = new XMLHttpRequest(); // create new XMLHttpRequest object
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let content = xhr.responseText.split(
              '<div id="page_content" class="content">'
            )[1];
            content = content.split('<br id="parse-me-away"/>')[0];
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
