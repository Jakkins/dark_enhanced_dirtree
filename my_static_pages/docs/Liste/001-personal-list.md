# Noisy Flow

<div id="noisy-flow-content"></div>

<script>
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
						  var nflink = document.createElement("a");
					if(lineValues[1]) {
    					nflink.href = lineValues[2];
    					nflink.textContent = lineValues[0] + " -- " + lineValues[1] + " -- " + lineValues[2];
					} else {
    					nflink.href = lineValues[2];
    					nflink.textContent = lineValues[0] + " -- " + lineValues[2];
					}
					child.appendChild(nflink);
						content.appendChild(child)
				}
			}
	});
});
</script>
