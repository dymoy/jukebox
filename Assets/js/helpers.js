// This function will open the track modal card 
function showModal() {
    trackModal.addClass("is-active");
}

// This function will close the track modal card 
function hideModal() {
    trackModal.removeClass("is-active");
    window.location.reload();
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
function showTrackAddedText(bool) {
    if (bool == false) {
        // Track is already favorited
        favoriteNotification.text("This song is already in your favorites!");
    } else {
        // Track was successfully added to favorites
        favoriteNotification.text("Song added to favorites!");
    }

    favoriteNotification.removeClass("is-hidden");
}

// This function hides the HTML element #favorites-notification
function hideTrackAddedText() {
    favoriteNotification.addClass("is-hidden");
}

// This function will show the HTML modal element to notify the user that the track has been removed from favorites list 
function showTrackRemovedModal() {
    trackRemovedNotificationDiv.classList.add('is-active');
}

// This function hides the modal element
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
function isFavorited(trackID) {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    return favorites.hasOwnProperty(trackID);
}