// A modular approach to JavaScript code.
// This separates the code into distinct functions for better organization.

const API_ENDPOINT = 'http://127.0.0.1:8006/recommend';
let tmdbApiKey = ''; // This will store the user's API key

// --- API Key Management ---
const apiKeyInput = document.getElementById('api-key-input');
const saveApiKeyButton = document.getElementById('save-api-key');
const toggleApiKeyButton = document.getElementById('toggle-api-key');

// Load API key from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('tmdbApiKey');
    if (savedKey) {
        tmdbApiKey = savedKey;
        apiKeyInput.value = savedKey;
        console.log("API key loaded from localStorage.");
    }
});

// Save API key to localStorage
saveApiKeyButton.addEventListener('click', () => {
    tmdbApiKey = apiKeyInput.value;
    localStorage.setItem('tmdbApiKey', tmdbApiKey);
    alert('API key saved successfully!');
});

// Toggle visibility of the API key input field
toggleApiKeyButton.addEventListener('click', () => {
    const type = apiKeyInput.type === 'password' ? 'text' : 'password';
    apiKeyInput.type = type;

    // Toggle the icon class for the show/hide effect
    const icon = toggleApiKeyButton.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});


// Function to handle the movie search and orchestrate the process.
async function handleMovieSearch() {
    const movieName = document.getElementById('movie-search-input').value;

    if (!movieName) {
        // Optionally display an error message to the user
        return;
    }

    if (!tmdbApiKey) {
        alert('Please save your TMDb API key first!');
        return;
    }

    // Display a loading state immediately
    showLoadingState();

    try {
        const recommendations = await fetchRecommendations(movieName);
        displayRecommendations(recommendations);
    } catch (error) {
        console.error('An error occurred:', error);
        displayErrorState('Sorry, something went wrong. Please try again later.');
    }
}

// Function to fetch data from the FastAPI backend.
async function fetchRecommendations(movieTitle) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // The API key is now part of the request body
        body: JSON.stringify({ 
            movie_title: movieTitle,
            api_key: tmdbApiKey
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.recommendations) {
        throw new Error('API response format is invalid.');
    }
    
    return data.recommendations;
}

// Function to display the movie cards on the page.
function displayRecommendations(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear previous results

    if (movies.length === 0) {
        movieList.innerHTML = '<p class="text-center text-lg text-gray-400 col-span-full">No recommendations found. Try another movie!</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieList.appendChild(movieCard);
    });
}

// Function to create a single movie card element.
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add(
        'bg-gray-700', 'p-4', 'rounded-xl', 'shadow-md', 'flex', 
        'flex-col', 'items-center', 'space-y-2', 'transition-transform', 
        'transform', 'hover:scale-105', 'hover:bg-gray-600', 'duration-200'
    );

    const posterImage = document.createElement('img');
    posterImage.src = movie.poster;
    posterImage.alt = movie.title;
    posterImage.classList.add(
        // Set a fixed width and height for the image
        'w-32', 'h-48',
        // Make sure the image covers the container while maintaining its aspect ratio
        'object-cover', 
        // Add rounded corners and a shadow
        'rounded-lg', 'shadow-sm'
    );

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add(
        'text-lg', 'font-semibold', 'text-blue-300', 'text-center'
    );
    
    movieCard.appendChild(posterImage);
    movieCard.appendChild(movieTitle);

    return movieCard;
}

// Function to display a loading message.
function showLoadingState() {
    const recommendationsContainer = document.getElementById('recommendations-container');
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '<div class="text-center text-lg text-gray-400 col-span-full">Loading recommendations...</div>';
    recommendationsContainer.classList.remove('hidden');
}

// Function to display an error message.
function displayErrorState(message) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = `<p class="text-center text-red-400 col-span-full">${message}</p>`;
}

// Event listener to start the process.
document.getElementById('search-button').addEventListener('click', handleMovieSearch);
