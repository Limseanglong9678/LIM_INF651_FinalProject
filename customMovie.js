document.getElementById('movieForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('movieTitle').value;
    const year = document.getElementById('releaseYear').value;
    const description = document.getElementById('movieDescription').value;
    const posterInput = document.getElementById('moviePoster');
    
    if (!posterInput.files[0]) {
        alert('Please upload an image.');
        return;
    }

    const file = posterInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            // Resize the image using a <canvas>
            const canvas = document.createElement('canvas');
            const maxWidth = 500; // Maximum width (resize to this if larger)
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convert the resized image to Base64
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality

            // Create the new movie object
            const newMovie = {
                Title: title,
                Year: year,
                Plot: description,
                Poster: resizedBase64
            };

            // Store the movie in localStorage
            let watchlistStore = JSON.parse(localStorage.getItem('watchlistStore')) || [];
            watchlistStore.push(newMovie);
            localStorage.setItem('watchlistStore', JSON.stringify(watchlistStore));

            document.getElementById('addMovieFeedback').innerText = 'Movie added successfully!';
            document.getElementById('movieForm').reset();
        };
    };

    reader.onerror = function () {
        alert('Failed to process the image. Please try again.');
    };

    reader.readAsDataURL(file);
});
