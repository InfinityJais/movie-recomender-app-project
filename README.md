# Movie Recommender App

## 🎬 Project Overview
This is a movie recommendation system that suggests films to users based on their preferences. It helps users discover new movies they might enjoy by using data on movie genres, ratings, and user history.
This project is built using **FastAPI (backend)** and **HTML + CSS + JS (frontend)**, with support for **machine learning models** to generate recommendations.
---
## ✨ Features

- 🔍 Search for movies by title  
- 🎯 Personalized recommendations based on user preferences  
- 📊 Uses machine learning for recommendation (collaborative/content-based filtering)
- 🌐 API built with FastAPI, connected to UI
- 🐳 Dockerized for easy deployment
- 🌐 Deployed with GitHub Pages / Docker support  
- 🎨 Lightweight UI with HTML + CSS + JS

---

## 🛠️Technologies stack

* **Backend:** FastAPI, Uvicorn
* **Frontend:** HTML, CSS, JavaScript
* **Machine Learning:** Scikit-learn, Pandas, NumPy
* **API:** TMDB API (The Movie Database)
* **Deployment:** Docker, Render (backend), GitHub Pages (frontend)
---

## 📂 Project Structure

```movie-recommender-app-project/
│── backend/ # FastAPI backend
│ ├── main.py # API entry point
│── frontend/ #  HTML, CSS, JavaScript
│ ├── style.css
│ ├── index.html
│ ├── main.js
│── requirements.txt # Python dependencies
├── Dockerfile  # Docker setup
│── README.md # Project documentation
```

---
## 🚀 Getting Started

### Prerequisites

List any software or dependencies a user needs to have installed.

   * Python 3.x
   * `pip` (Python package installer)
   * Git

### Installation


1.  Clone the repository:
    ```bash
    git clone https://github.com/InfinityJais/movie-recomender-app-project.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd movie-recomender-app-project
    ```
3.  Create vertual envirment:
    ```bash
    python -m venv venv
    ```
4.  Activate vertual enveirement:
    ```bash
    venv\Scripts\activate  #Windows
    ```
    ```bash
    source venv/bin/activate  #Mac/Linux
    ```
5.  Install the required libraries:
    ```bash
    pip install -r requirements.txt
    ```
5.  Run FastAPI server:
    ```bash
    uvicorn main:app --reload #(Note: This command assumes main.py is located in the root directory. If it's in the backend/ folder, you might need to adjust the path to uvicorn backend.main:app --reload)
    ```

---

## 🎯 Usage

1. Open Fastapi bocs in browser → http://localhost:3000
2. Enter a movie name and TMDB api key
3. The backend fetches & processes recommendations with ML model
4. Connect frontend (HTML/JS) with backend API
5. Enjoy your personalized movie suggestions 🎉

---

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
