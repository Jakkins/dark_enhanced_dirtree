# Noisy Flow

<div id="noisy-flow-content"></div>

<script>
	const isValidUrl = urlString => {
      try {
      	return Boolean(new URL(urlString));
      }
      catch(e){
      	return false;
      }
  }

/**
 * https://javascript.info/url
 */
window.addEventListener("load", async function (event) {
	const content = document.getElementById("noisy-flow-content");
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "https://raw.githubusercontent.com/Jakkins/static.pages.api/main/links", false );
	xmlHttp.send( null );
	const lines = xmlHttp.responseText.split(/\r?\n/);
	lines.forEach((line) => {
		const lineValues = line.split(/\|/);
		if(lineValues[0]) {
			if(lineValues[2]) {
				var child = document.createElement("p");
				var date = document.createElement("span");
				date.setAttribute("style","color: rgb(56, 226, 18)");
				var info = document.createElement("span");
				info.setAttribute("style","color: rgb(226, 138, 0)");
				var link = document.createElement("a");
				let url = new URL(lineValues[2]);
				if(lineValues[1]) {
					date.textContent = lineValues[0] + " | ";
					info.textContent = lineValues[1] + " | ";
					if(url) {
						link.href = url;
						link.textContent = url.host;
					}
				} else {
					date.textContent = lineValues[0] + " | ";
					if(url) {
						link.href = url;
						link.textContent = url.host + url.pathname;
					}
				}
				child.appendChild(date);
				if(info.textContent) child.appendChild(info);
				child.appendChild(link);
				content.appendChild(child);
			}
		}
	});
});
</script>
