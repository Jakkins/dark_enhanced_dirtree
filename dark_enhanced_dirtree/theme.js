(function () {
  console.log("every page loaddd");
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let last_active_nav_el = null;

async function setNavActiveByUrl(url) {
  let li_nodelist = this.document.getElementsByClassName("nav-page");
  for (var i = 0, len = li_nodelist.length; i < len; i++) {
    let a_el = li_nodelist[i].getElementsByTagName("a")[0]; // get a inside li
    if (a_el.href === url) {
      setActive(li_nodelist[i]);
      const li_children = li_nodelist[i].closest("li.children");
      let li_section = li_children.previousElementSibling;
      while (li_section) {
        if (li_section.classList.contains("section")) {
          li_section.classList.remove("collapsed");
          let li_children = li_section.closest("li.children");
          li_section =
            li_children !== null ? li_children.previousElementSibling : null;
        }
      }
    }
  }
}

function setAElements() {
  let all_a_el = document.getElementsByTagName("a");
  for (var i = 0, len = all_a_el.length; i < len; i++) {
    all_a_el[i].onclick = function (e) {
      let url_str = e.target.href;
      if (url_str.includes(window.location.host)) {
        let last_url_char = url_str[url_str.length - 1];
        if (last_url_char === "/") {
          try {
            loadPage(url_str);
            setNavActiveByUrl(url_str);
          } catch (e) {
            console.log(e);
          } finally {
            e.preventDefault();
          }
        } else {
          // filter mp4, mp3, etc.... do nothing
        }
      } else {
        // external URL, do nothing (for now)
      }
    };
  }
}

function setActive(target) {
  if (last_active_nav_el !== null) {
    last_active_nav_el.classList.toggle("active");
  }
  target.classList.toggle("active");
  last_active_nav_el = target;
}

function loadPage(url) {
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
      setAElements();
    }
  };
  xhr.open("GET", url, true); // open the request with the GET method
  xhr.send(); // send the request
}

window.addEventListener("load", function (event) {
  setAElements();
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
        let a_el_page = event.target.firstElementChild; // HTMLAnchorElement
        loadPage(a_el_page.pathname);
      },
      false
    );
  }
});
