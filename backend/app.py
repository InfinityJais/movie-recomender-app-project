import pickle
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

# Initialize the FastAPI application
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model (now includes API key)
class RecommendationRequest(BaseModel):
    movie_title: str
    api_key: str  # User-provided TMDb API key

# Load movie data and similarity matrix
try:
    movies = pickle.load(open('../notebook/movie_list.pkl', 'rb'))
    similarity = pickle.load(open('../notebook/similarity.pkl', 'rb'))
except FileNotFoundError:
    movies = pd.DataFrame({'title': [], 'movie_id': []})
    similarity = []

# Fetch movie poster from TMDb API
def fetch_poster(movie_id: int, api_key: str):
    """Fetch the poster for a given movie ID from TMDb API."""
    if not api_key:  # No API key provided
        return "https://via.placeholder.com/150"

    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        poster_path = data.get('poster_path')
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500/{poster_path}"
    except requests.RequestException as e:
        print(f"Error fetching poster for movie ID {movie_id}: {e}")

    return "https://via.placeholder.com/150"

# Recommendation function
def recommend(movie: str, api_key: str):
    """Generate a list of 5 recommended movies based on the input movie title."""
    if movie not in movies['title'].values:
        return []

    index = movies[movies['title'] == movie].index[0]
    distances = sorted(
        list(enumerate(similarity[index])),
        reverse=True,
        key=lambda x: x[1]
    )

    recommendations = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].movie_id
        recommendations.append({
            'title': movies.iloc[i[0]].title,
            'poster': fetch_poster(movie_id, api_key)
        })
    return recommendations

# API endpoint for movie recommendations
@app.post('/recommend')
def get_recommendations(request_data: RecommendationRequest):
    """
    Accepts a movie title and API key via POST request,
    returns a list of recommended movies with their titles and poster URLs.
    """
    movie_name = request_data.movie_title
    api_key = request_data.api_key
    recommendations = recommend(movie_name, api_key)
    return {"recommendations": recommendations}

# Root endpoint
@app.get('/')
def read_root():
    """A simple root endpoint for the API."""
    return {"message": "Welcome to the Movie Recommendation API!"}
