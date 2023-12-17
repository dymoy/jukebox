// Retrieve favorites from local storage
var favorites = JSON.parse(localStorage.getItem("favorites")) || {};
var favoritesContainer = document.getElementById("favorites-container");
var noFavoritesMessage = document.getElementById("no-favorites-message");
var trackRemovedNotificationDiv = document.getElementById("track-removed-modal");
var modalContentDiv = document.getElementById("modal-card-body");

// Collects an array of keys from local storage 
if (Object.keys(favorites).length === 0) {
  // No favorites found 
  noFavoritesMessage.classList.remove("is-hidden");
} else {
  // Create a card for each favorited track 
  Object.keys(favorites).forEach(function (key) {
    var favorite = favorites[key];
    createFavoriteCard(favorite);
  });
}

// This function creates a card for each track in favorites
function createFavoriteCard(favorite) {
  var card = document.createElement("div");
  card.classList.add("column", "is-4");

  card.innerHTML = `
        <div class="card">
            <div class="card-image">
                <figure class="image is-square">
                    <img src="${favorite.albumArtUrl}" alt="Album Art">
                </figure>
            </div>
            <div class="card-content has-text-left">
                <p class="is-size-5">${favorite.title}</p>
                <p class="is-size-7">${favorite.artist}</p>
                <p class="is-size-7">${favorite.album}</p>
                <p class="is-size-7">${favorite.duration}</p>
            </div>
            <footer class="card-footer">
                <button class="card-footer-item button is-danger m-3" onclick="removeFromFavorites('${favorite.id}')">
                    Remove
                </button>
            </footer>
        </div>
    `;
    // Add the newly created card into the favorites container in HTML
  favoritesContainer.appendChild(card);
}

// This function will remove the track from HTML and local storage 
function removeFromFavorites(title) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || {};

  if (favorites.hasOwnProperty(title)) {
    delete favorites[title];
    showTrackRemovedModal();

    localStorage.setItem("favorites", JSON.stringify(favorites));

    favoritesContainer.innerHTML = "";
    if (Object.keys(favorites).length === 0) {
      noFavoritesMessage.classList.remove("is-hidden");
    } else {
      Object.keys(favorites).forEach(function (key) {
        var favorite = favorites[key];
        createFavoriteCard(favorite);
      });
    }
  }
}
