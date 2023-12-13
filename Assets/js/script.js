var musicModal = $("#track-modal-card");
var searchInputEl = $("#search-input");

function showModal() {
  musicModal.addClass("is-active");
  queryInput();
}

function closeModal() {
  musicModal.removeClass("is-active");
}

// favoriteTrack() will save the track in local storage with (key: track title, val: song object)
function favoriteTrack() {
  var trackTitle = document.getElementById("track-title").innerText;
  var trackArtist = document.getElementById("track-artist").innerText;
  var trackAlbum = document.getElementById("track-album").innerText;
  var albumArtUrl = document.getElementById("album-art-image").src;
  if (isFavorited(trackTitle)) {
    alert("This song is already in your favorites!");
    return;
  }

  var songObject = {
    title: trackTitle,
    artist: trackArtist,
    album: trackAlbum,
    albumArtUrl: albumArtUrl,
  };

  saveToLocalStorage(trackTitle, songObject);
  alert("Song added to favorites!");
}

function isFavorited(trackTitle) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  return favorites.hasOwnProperty(trackTitle);
}

function saveToLocalStorage(trackTitle, songObject) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  favorites[trackTitle] = songObject;
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// getAPI() function uses fetch method to get track data
function getAPI(url, options) {
  fetch(url, options)
    .then(function (response) {
      // Check response status
      if (response.status !== 200) {
        // Endpoint not found
        console.log(response.status);
        alert("No song found. Please try again.");
        return;
      }
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      presentTrack(data.tracks.items[0].data);
    });
}

// getRandomOffset() function returns a random number from 1-100
function getRandomOffset() {
  return Math.floor(Math.random() * 100) + 1;
}

// TODO: Display song information into Modal HTML element
function presentTrack(trackData) {
  // do something with data
  console.log("trackData ", trackData);
  document.getElementById("album-art-image").src =
    trackData.albumOfTrack.coverArt.sources[0].url;
  //set width
  document.getElementById(
    "album-art-image"
  ).style.width = `${trackData.albumOfTrack.coverArt.sources[0].width}px`;
  document.getElementById(
    "album-art-image"
  ).style.height = `${trackData.albumOfTrack.coverArt.sources[0].height}px`;
  document.getElementById(
    "track-title"
  ).innerHTML = `<b>Title :</b> ${trackData.name}`;
  document.getElementById(
    "track-artist"
  ).innerHTML = `<b>Artist :</b> ${trackData.artists.items[0].profile.name}`;
  document.getElementById(
    "track-album"
  ).innerHTML = `<b>Album :</b> ${trackData.albumOfTrack.name}`;
}

// queryURL() function constructs URL to fetch from Web API
async function queryInput() {
  var q = searchInputEl.val();
  var offset = getRandomOffset();

  const url =
    "https://spotify23.p.rapidapi.com/search/?q=" +
    q +
    "&type=tracks&offset=" +
    offset +
    "&limit=1";
  console.log(url);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1c600fb95amsh21018a7df31c5b0p1759f2jsn2f3a2b2758a2",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  getAPI(url, options);
}
