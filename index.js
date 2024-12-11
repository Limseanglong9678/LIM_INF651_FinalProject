import { renderMovies } from './util.js';

const myForm = document.getElementById('myform');
const mySearch = document.getElementById('mySearch');
const main = document.getElementById('main');
let movieArr = [];

if (myForm) {
    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData(mySearch.value);
    });
}

async function fetchData(value) {
    movieArr = [];
    main.innerHTML = '';

    const res = await fetch(`https://www.omdbapi.com/?s=${value}&apikey=8e78e2ac`);
    const data = await res.json();

    if (data.Response === 'True') {
        for (let movie of data.Search) {
            const details = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8e78e2ac`);
            const movieDetails = await details.json();
            movieArr.push(movieDetails);
        }
        renderMovies(movieArr, main);
    } else {
        main.innerHTML = `<div class="empty">Unable to find what you're looking for. Try another search.</div>`;
    }
}
