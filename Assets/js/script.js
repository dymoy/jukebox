var musicModal = document.getElementById("music-modal-card");

function showModal() {
    musicModal.classList.add('is-active');
}

function closeModal() {
    musicModal.classList.remove('is-active');
}

// TODO: getAPI() function uses fetch method to get song data 

// TODO: getRandomIndex() function to get random song object from API fetch data 

// TODO: Display song information into Modal HTML element 

// TODO: Favorite functionality: store song into local storage with (key: song title, val: song object)

// TODO: queryURL() function constructs URL to fetch from Web API 