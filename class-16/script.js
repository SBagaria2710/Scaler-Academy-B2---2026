const searchInput = document.querySelector('#searchInput');
const movieList = document.querySelector('#movieList');

// Initial Setup
const defaultMovies = [
    "The Dark Knight",
    "Inception",
    "Interstellar",
    "The Matrix",
    "Pulp Fiction",
    "The Godfather",
    "Fight Club",
    "Forrest Gump",
    "The Shawshank Redemption",
    "Gladiator",
    "The Prestige",
    "Memento"
];

let movies = JSON.parse(localStorage.getItem("movies"));
if (!movies) {
    movies = defaultMovies;
    localStorage.setItem("movies", JSON.stringify(movies));
}

function renderMovies() {
    movieList.inneHTML = "";
    movies.forEach(function(movie) {
        const card = document.createElement("div");
        card.classList.add("movie-card", "visible");
        card.innerHTML = `<span class="movie-title">${movie}</span><button class="delete-btn">X</button>`;
        movieList.appendChild(card);
    });
}

renderMovies();


// Keyboard Search Filter
searchInput.addEventListener('keyup', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = movieList.querySelectorAll('.movie-card');
    cards.forEach(function (card) {
        const title = card.querySelector('.movie-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Scroll Aware Navbar
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal On Scroll
function revealOnScroll() {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(function (card) {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            card.classList.add('visible');
        }
    });
}
revealOnScroll();
window.addEventListener('scroll', revealOnScroll);

// Delete with Event Delegation
movieList.addEventListener('click', function (event) {
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        const card = deleteBtn.closest('.movie-card');
        const movieTitle = card.querySelector(".movie-title").textContent;
        movies = movies.filter(function (movie) {
            return movie !== movieTitle;
        });

        localStorage.setItem("movies", JSON.stringify(movies));
        renderMovies();
        card.remove();
    }
});


// Adding new movies dynamically
const addButton = document.querySelector("#addMovie");
addButton.addEventListener('click', function () {
    const movieName = prompt("Enter movie name:");
    if (!movieName) return;
    movies.push(movieName);
    localStorage.setItem("movies", JSON.stringify(movies));
    renderMovies();
    revealOnScroll();
});