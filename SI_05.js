// script.js

const apiKey = "4616c0d9"; // OMDb API key
const moviesContainer = document.getElementById("moviesContainer");
const watchlistContainer = document.getElementById("watchlist");

let watchlist = [];

// Predefined movies data
const moviesData = {
  batman: "tt0372784", // Batman Begins
  pk: "tt2338151", // PK
  conjuring: "tt1457767", // The Conjuring
};

function searchMovies() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const imdbID = moviesData[query];

  if (imdbID) {
    fetchMovieDetails(imdbID);
  } else {
    moviesContainer.innerHTML = `<p>No movies found. Try "Batman," "PK," or "Conjuring".</p>`;
  }
}

function fetchMovieDetails(imdbID) {
  fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((movie) => displayMovie(movie))
    .catch((error) => console.error("Error fetching movie data:", error));
}

function displayMovie(movie) {
  moviesContainer.innerHTML = `
        <div class="movie-item">
            <img src="${movie.Poster}" alt="${movie.Title} poster">
            <div>
                <h3>${movie.Title}</h3>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Cast:</strong> ${movie.Actors}</p>
                <p><strong>Rating:</strong> ${movie.imdbRating}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <button onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}')">Add to Watchlist</button>
            </div>
        </div>
    `;
}

function addToWatchlist(imdbID, title) {
  if (watchlist.some((movie) => movie.imdbID === imdbID)) return;

  const movieItem = { imdbID, title };
  watchlist.push(movieItem);
  updateWatchlist();
}

function updateWatchlist() {
  watchlistContainer.innerHTML = "";
  watchlist.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${movie.title} <button onclick="removeFromWatchlist('${movie.imdbID}')">Remove</button>`;
    watchlistContainer.appendChild(listItem);
  });
}

function removeFromWatchlist(imdbID) {
  watchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
  updateWatchlist();
}
