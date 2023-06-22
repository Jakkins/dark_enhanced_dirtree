# SFC Radio

<!-- todo checkbuttons -->
<div id="player_checkbuttons"></div>
<!-- todo player commands (nextSong, ) -->
<div id="player_commands" style="margin: 20px auto">
		<!--
			<button id="prev-btn">Previous</button>
		-->
		<button id="play-pause-btn" onclick="playPauseVideoAction()">Play/Pause</button>
		<button id="next-btn" onclick="nextVideoAction()">Next</button>
		<button id="vol-up-btn" onclick="volUpVideoAction()">Vol+</button>
		<button id="vol-down-btn" onclick="volDownVideoAction()">Vol-</button>
</div>

<div id="debug-link"></div>

<div id="player"></div>

<script src="https://www.youtube.com/iframe_api"></script>

<script>
	/**
	 * https://developers.google.com/youtube/iframe_api_reference
	 * setPlaybackQuality
	 * https://javascript.info/url
   */

	let player_max_width = 640
	let player_el
	let player;
	let all_vid_urls = []
	let source_urls_to_filter = []
	let player_state

	let player_checkbuttons = document.getElementById('player_checkbuttons')
	let debug_link = document.getElementById('debug-link')

	function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
					height: '0',
					width: '0',
					videoId: getRandomSong(),
					playerVars: {
							'playsinline': 1
					},
					events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange,
							'onPlaybackQualityChange': onPlaybackQualityChange
					}
			});
			player_el = document.getElementById("player");
			player_el.style.margin = "auto"
			setPlayerSize()
		}

	function getRandomSong() {
		let rand_vid = all_vid_urls[Math.floor(Math.random()*all_vid_urls.length)];
		if(rand_vid) return rand_vid
		else return "AWVUp12XPpU";
	}

	function loadSongList(urlstr) {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", urlstr, false);
		xmlHttp.send(null);
		const lines = xmlHttp.responseText.split(/\r?\n/);
		lines.forEach((line) => {
			let new_line = line.split("|");
			try {
				let url = new URL(new_line[0]);
				let yt_code = url.searchParams.get("v");
				if(yt_code) {
					all_vid_urls.push(yt_code)
				}
			}
			catch(e){
				console.log(new_line)
			}
		})
	}

	function resetAllVidUrls() {
		all_vid_urls = []
		let jsonurl = location.protocol + '//' + location.host + "/sfcradio.json";
		getJSON(jsonurl, function(err, data) {
			if(err) return console.log(err)
			data.forEach(d => {
				if(source_urls_to_filter.indexOf(d.name) === -1) {
					loadSongList(d.url)
				}
			})
		});
	}

	function removeFromArray(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) { // only splice array when item is found
			arr.splice(index, 1); // 2nd parameter means remove one item only
		}
	}

	function loadCheckButton(namestr) {
		let checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.value = namestr;
		checkbox.name = "checkbox name";
		checkbox.id = "checkbox "+ namestr;
		checkbox.checked = true
		checkbox.addEventListener('change', (event) => {
			if (event.currentTarget.checked) {
				removeFromArray(source_urls_to_filter, event.target.defaultValue)
			} else {
				source_urls_to_filter.push(event.target.defaultValue)
			}
			resetAllVidUrls()
		})
		let label = document.createElement('label');
		label.for = "checkbox "+ namestr;  // same to the checkbox ID
		label.textContent = namestr;
		player_checkbuttons.appendChild(checkbox);
		player_checkbuttons.appendChild(label);
	}

	function onPlayerReady(event) {
		event.target.setVolume(25);
		// event.target.playVideo();  	// autoplay video, do i need this?
	}

	// when video ends
	function onPlayerStateChange(event) {
		player_state = event.data
		if(event.data === 1) {
			setPlayerSize()
		}
		if (event.data === 0) {
			player.loadVideoById(getRandomSong(), 0, "tiny")
		}
	}

	function onPlaybackQualityChange(event) {
		console.log(event)
	}

	function playPauseVideoAction() {
		if(player_state === 1) {
			player.pauseVideo()
		} else {
			player.playVideo()
		}
	}

	function nextVideoAction() {
		let url = getRandomSong()
		player.loadVideoById(url, 0, "tiny")
		debug_link.innerText = url
	}

	function volUpVideoAction() {
		let avtualVol = player.getVolume()
		player.setVolume(avtualVol+10)
	}

	function volDownVideoAction() {
		let avtualVol = player.getVolume()
		player.setVolume(avtualVol-10)
	}

	function setPlayerSize() {
		let page_content = document.getElementById('page_content')
		let right_width
		if((page_content.clientWidth - 20) > player_max_width) {
			right_width = player_max_width
		} else {
			right_width = page_content.clientWidth - 20
		}
		player_el.width = right_width
		player_el.height = player_el.width / 16 * 9
	}

	const isValidUrl = urlString => {
			try {
					return Boolean(new URL(urlString));
			}
			catch(e){
					return false;
			}
	}

	var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
	};

	window.addEventListener("load", async function (event) {
		// all types of music, podcast, meme
		let jsonurl = location.protocol + '//' + location.host + "/sfcradio.json";
		getJSON(jsonurl, function(err, data) {
			if(err) return console.log(err)
			data.forEach(d => {
				loadSongList(d.url)
				loadCheckButton(d.name)  // load checkbox only one time !!!
			})
			// player.loadVideoById(getRandomSong(), 0, "tiny") // automatic autoplay
			player.cueVideoById(getRandomSong(), 0, "tiny")	// no autoplay
		});
	});

	window.addEventListener("resize", function(event) {
		// console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
		setPlayerSize()
	})

</script>
