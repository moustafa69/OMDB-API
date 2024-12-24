// src/components/MovieSearch.tsx

import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  // Fetch movies from OMDb API based on the search term
  const handleSearch = async () => {
    if (searchTerm) {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=b1b1ea67&s=${searchTerm}`
      );
      setMovies(response.data.Search || []);
    }
  };

  // Add movie to favorites via API call
  const addToFavorites = async (movie: any) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/movie/favorite/${movie.imdbID}`,
        {
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
          type: movie.Type,
        }
      );

      if (response.status === 200) {
        // Update favorites only if the API call is successful
        setFavorites((prev) => [...prev, movie]); // Add to favorites state
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Remove movie from favorites via API call
  const removeFromFavorites = async (imdbID: string) => {
    try {
      await axios.delete(`http://localhost:3000/movie/favorite/${imdbID}`);
      setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID)); // Remove from favorites state
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
      <h2>Search Results</h2>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
            onFavorite={() => addToFavorites(movie)} // Add to favorites
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)} // Check if this movie is already a favorite
          />
        ))}
      </div>
      <h2>Favorites</h2>
      <div style={styles.grid}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
            onFavorite={() => removeFromFavorites(movie.imdbID)} // Remove from favorites
            isFavorite // Indicate this is a favorite movie
            isInFavorites // Indicate it should render the remove button
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
  },
};

export default MovieSearch;
