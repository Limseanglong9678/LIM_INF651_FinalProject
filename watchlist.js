import { renderWatchlist } from './util.js';

let watchlistStore = JSON.parse(localStorage.getItem('watchlistStore')) || [];
const wmain = document.getElementById('wmain');

if (wmain) {
    if (watchlistStore.length > 0) {
        renderWatchlist(watchlistStore, wmain);
    } else {
        wmain.innerHTML = `
            <div class="empty">
                <h2>Your watchlist is looking pretty empty</h2>
                <p><a href="index.html">Add some movies to your watchlist</a></p>
            </div>`;
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        const index = e.target.dataset.index;
        watchlistStore.splice(index, 1);
        localStorage.setItem('watchlistStore', JSON.stringify(watchlistStore));
        renderWatchlist(watchlistStore, wmain);
    }
});


