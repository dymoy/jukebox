// This function will open the track modal card 
function showModal() {
    trackModal.addClass("is-active");
}

// This function will close the track modal card 
function hideModal() {
    trackModal.removeClass("is-active");
}

// This function will show the HTML element to notify the user the word is not queryable
function showQueryError() {
    queryErrorDiv.removeClass("is-hidden");
}

// This function will hide the queryErrorDiv from view 
function hideQueryError() {
    queryErrorDiv.addClass("is-hidden");
}

// This function will show the HTML element to notify the user whether track was successfully added to favorites 
function showTrackAddedText() {
    favoriteNotification.removeClass("is-hidden");
}

// This function hides the HTML element #favorites-notification
function hideTrackAddedText() {
    favoriteNotification.addClass("is-hidden");
}

function showTrackRemovedModal() {
    trackRemovedNotificationDiv.classList.add('is-active');
}
  
function hideTrackRemovedModal() {
    trackRemovedNotificationDiv.classList.remove('is-active');
}

// This function converts seconds to minutes 
function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60); 
    var seconds = seconds - minutes * 60; 
    return minutes + "mins " + parseInt(seconds) +"secs";
}

// This getRandomOffset() function returns a random number from 1-100
function getRandomOffset() {
    return Math.floor(Math.random() * 100) + 1;
}

// This function checks if the track is already favorited 
function isFavorited(trackTitle) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    return favorites.hasOwnProperty(trackTitle);
}