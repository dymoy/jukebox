var trackModal = $("#track-modal-card");
var searchInputEl = $("#search-input");
var searchBtnEl = $("#search-input-btn");
var body = $("body");
var queryErrorDiv = $("#query-error-div");
var favoriteNotification = $("#favorite-notification");

// This getAPI() function uses fetch method to get track data
function getAPI(url, options) {
    fetch(url, options)
    .then(function (response) {
        // Check response status
        if (response.status !== 200) { 
            // Endpoint not found
            return;
        }
        return response.json();
    })
    .then(function (data) { //success
        // Use a try-catch statement to check if query string is queryable 
        try {
            var trackData = data.tracks.items[0].data;
            hideQueryError();
            showModal();
            hideTrackAddedText();
            presentTrack(trackData);
        } catch(error) {
            // TypeError caught - Query string entered is not queryable  
            showQueryError();
            return;
        }
    });
}

// This favoriteTrack() funciton will save the track in local storage 
function favoriteTrack() {
    var trackTitle = document.getElementById("track-title").innerText;
    var trackArtist = document.getElementById("track-artist").innerText;
    var trackAlbum = document.getElementById("track-album").innerText;
    var albumArtUrl = document.getElementById("album-art-image").src;
    var duration = document.getElementById("track-duration").innerText;

    // Check if the track is already favorited 
    if (isFavorited(trackTitle)) {
        showTrackAddedText(false);
        return;
    }

    // Create an object to store relevant track data 
    var songObject = {
        title: trackTitle,
        artist: trackArtist,
        album: trackAlbum,
        albumArtUrl: albumArtUrl,
        duration: duration,
    };

    saveToLocalStorage(trackTitle, songObject);
    showTrackAddedText(true);
}

// This function will save the favorited track into local storage 
function saveToLocalStorage(trackTitle, songObject) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    favorites[trackTitle] = songObject;
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Display song information into Modal HTML element
function presentTrack(trackData) {
    document.getElementById("album-art-image").src = trackData.albumOfTrack.coverArt.sources[0].url;
    
    document.getElementById(
    "track-title"
    ).innerHTML = `<b>Title :</b> ${trackData.name}`;

    document.getElementById(
    "track-artist"
    ).innerHTML = `<b>Artist :</b> ${trackData.artists.items[0].profile.name}`;

    document.getElementById(
    "track-album"
    ).innerHTML = `<b>Album :</b> ${trackData.albumOfTrack.name}`;

    document.getElementById("track-duration").innerHTML = `<b>Duration :</b> ${secondsToMinutes(trackData.duration.totalMilliseconds/1000)}`;

    loadIFrame(trackData); 
}

// This function calls the Spotify for Developers iFrame API to display a player for users to listen to a snippet of the queried track
function loadIFrame(trackData) {
    var iFrameScript = "<script src='https://open.spotify.com/embed/iframe-api/v1' id='iframe-api-script' async></script>";
    body.append(iFrameScript);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
        var element = document.getElementById('embed-iframe');

        const options = {
            width: '100%',
            height: '80'
        };

        const callback = (EmbedController) => {
            EmbedController.loadUri(trackData.uri);
        }

        IFrameAPI.createController(element, options, callback);
    };
}

// This queryURL() function constructs URL to fetch from Web API
async function queryInput() {
    var q = searchInputEl.val();
    var offset = getRandomOffset();

    const url =
    "https://spotify23.p.rapidapi.com/search/?q=" +
    q +
    "&type=tracks&offset=" +
    offset +
    "&limit=1";

    const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "1c600fb95amsh21018a7df31c5b0p1759f2jsn2f3a2b2758a2",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  getAPI(url, options);
}
