// src/pages/FavoritesPage.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "../components/MovieCard/MovieCard";

const FAVORITE_API_URL = "http://localhost:3000/movie/favorite";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(FAVORITE_API_URL);
        setFavorites(response.data); // Assuming the response data is an array of favorite movies
        setError(""); // Clear any previous errors
      } catch (err) {
        setError("Failed to fetch favorite movies.");
        console.error(err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Favorite Movies</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.moviesContainer}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
            imdbID={movie.id} // Use movie.id as the key
            onFavorite={() => {}} // You may want to implement remove functionality later
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  error: {
    color: "red",
  },
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
