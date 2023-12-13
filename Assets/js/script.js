var musicModal = $("#track-modal-card");
var searchInputEl = $("#search-input");

function showModal() {
    musicModal.addClass('is-active');
    queryInput();
}

function closeModal() {
    musicModal.removeClass('is-active');
}

// favoriteTrack() will save the track in local storage with (key: track title, val: song object)
function favoriteTrack() { 
    // TODO: check if song is already favorited
    // if (isFavorited) { notify user }
    // else (!isFavorited) { 
        // create an object with relevant attributes needed to display in card
        // add the song to local storage 
    //} 
}

// getAPI() function uses fetch method to get track data 
function getAPI(url, options) {
    fetch(url, options)
    .then(function(response) {
        // Check response status 
        if (response.status !== 200) {
            // Endpoint not found 
            console.log(response.status);
            return;
        } 
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        presentTrack(data.tracks.items[0].data); 
    })
}

// getRandomOffset() function returns a random number from 1-100  
function getRandomOffset() {
    return Math.floor(Math.random() * 100) + 1;
}

// TODO: Display song information into Modal HTML element
function presentTrack(trackData) {
    // do something with data 
    console.log(trackData);
}

// queryURL() function constructs URL to fetch from Web API 
async function queryInput () {
    var q = searchInputEl.val();
    var offset = getRandomOffset();
    
    const url = 'https://spotify23.p.rapidapi.com/search/?q=' + q + '&type=tracks&offset=' + offset + '&limit=1';
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1c600fb95amsh21018a7df31c5b0p1759f2jsn2f3a2b2758a2',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    getAPI(url, options);
}