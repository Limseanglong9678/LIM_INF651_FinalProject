export function renderMovies(movies, container) {
    container.innerHTML = '';

    let watchlistStore = JSON.parse(localStorage.getItem('watchlistStore')) || []; // Retrieve existing watchlist

    if (!document.getElementById('popupModal')) {
        createModal();
    }

    movies.forEach((movie, index) => {
        const poster = movie.Poster !== 'N/A' ? movie.Poster : './assets/placeholder.png';
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie-container';
        movieDiv.innerHTML = `
            <img src="${poster}" alt="${movie.Title}" class="movie-poster" style="width: 100px; height: auto; border-radius: 5px;">
            <h3 class="movie-title">${movie.Title} (${movie.Year}) 
            </br></br>${movie.Plot || "No description available."}</h3>
            <button class="watchlist" data-index="${index}">+</button>
        `;
        container.appendChild(movieDiv);
    });

    // Attach Event Listeners for "Add to Watchlist" Buttons
    const watchlistButtons = container.querySelectorAll('.watchlist');

    watchlistButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const movieToAdd = movies[index];

            if (watchlistStore.some(movie => movie.Title === movieToAdd.Title)) {
                showModal('This movie is already in your watchlist!');
            } else {
                watchlistStore.push(movieToAdd);
                localStorage.setItem('watchlistStore', JSON.stringify(watchlistStore));
                button.textContent = 'Added!';
                button.disabled = true;
            }
        });
    });
}

export function renderWatchlist(watchlist, container) {
    container.innerHTML = '';

    // Add search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search watchlist...';
    searchBar.id = 'searchWatchlist';
    searchBar.className = 'search-bar';
    container.appendChild(searchBar);

    // Add sort buttons
    const sortControls = document.createElement('div');
    sortControls.className = 'sort-controls';
    sortControls.innerHTML = `
        <button id="sortByYear" class="sort-button">Sort by Year</button>
        <button id="sortByName" class="sort-button">Sort by Name</button>
    `;
    container.appendChild(sortControls);

    const moviesContainer = document.createElement('div');
    moviesContainer.className = 'movies-container';
    container.appendChild(moviesContainer);

    function renderFilteredWatchlist(filterText) {
        moviesContainer.innerHTML = '';

        const filteredWatchlist = watchlist.filter(movie =>
            movie.Title.toLowerCase().includes(filterText.toLowerCase())
        );

        filteredWatchlist.forEach((movie, index) => {
            const poster = movie.Poster !== 'N/A' ? movie.Poster : './assets/placeholder.png';
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie-container';
            movieDiv.innerHTML = `
                <img src="${poster}" alt="${movie.Title}" class="movie-poster" style="width: 100px; height: auto; border-radius: 5px;">
                <h3 class="movie-title">${movie.Title} (${movie.Year})
                </br></br> ${movie.Plot || "No description available."}</h3>
                <button class="remove-button" data-index="${index}">-</button>
            `;
            moviesContainer.appendChild(movieDiv);
        });

        // Attach event listeners for remove buttons
        const removeButtons = moviesContainer.querySelectorAll('.remove-button');
        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'), 10);
                watchlist.splice(index, 1);
                localStorage.setItem('watchlistStore', JSON.stringify(watchlist));
                renderFilteredWatchlist('');
            });
        });
    }

    searchBar.addEventListener('input', (e) => {
        const filterText = e.target.value;
        renderFilteredWatchlist(filterText);
    });

    renderFilteredWatchlist('');

    // Add sort functionality
    document.getElementById('sortByYear').addEventListener('click', () => {
        watchlist.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        renderFilteredWatchlist('');
    });

    document.getElementById('sortByName').addEventListener('click', () => {
        watchlist.sort((a, b) => a.Title.localeCompare(b.Title));
        renderFilteredWatchlist('');
    });
}

export function createModal() {
    const modal = document.createElement('div');
    modal.id = 'popupModal';
    modal.classList.add('modal');

    modal.innerHTML = `
        <div id="modalContent" class="modal-content">
            <p id="modalMessage" class="modal-message"></p>
            <button id="closeModal" class="modal-close">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    return modal;
}

export function showModal(message) {
    const modalMessage = document.getElementById('modalMessage');
    const modal = document.getElementById('popupModal');
    if (modalMessage && modal) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }
}
