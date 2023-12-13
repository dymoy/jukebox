// Retrieve favorites from local storage
var favorites = JSON.parse(localStorage.getItem("favorites")) || {};

var favoritesContainer = document.getElementById("favorites-container");
var noFavoritesMessage = document.getElementById("no-favorites-message");

if (Object.keys(favorites).length === 0) {
  noFavoritesMessage.classList.remove("is-hidden");
} else {
  Object.keys(favorites).forEach(function (key) {
    var favorite = favorites[key];
    createFavoriteCard(favorite);
  });
}

function createFavoriteCard(favorite) {
  var card = document.createElement("div");
  card.classList.add("column", "is-4");

  card.innerHTML = `
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="${favorite.albumArtUrl}" alt="Album Art">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4">${favorite.title}</p>
                <p class="subtitle is-6">${favorite.artist}</p>
                <p class="subtitle is-6">${favorite.album}</p>
                <p class="subtitle is-6">${favorite.duration}</p>
            </div>
            <footer class="card-footer">
                <button class="card-footer-item button is-danger mb-3" onclick="removeFromFavorites('${favorite.title}')">
                    Remove
                </button>
            </footer>
        </div>
    `;
  favoritesContainer.appendChild(card);
}



function removeFromFavorites(title) {
  var favorites = JSON.parse(localStorage.getItem("favorites")) || {};

  if (favorites.hasOwnProperty(title)) {
    delete favorites[title];

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
