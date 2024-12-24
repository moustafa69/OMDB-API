// src/components/MovieCard.tsx

import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  year: string;
  onFavorite: () => void; // Prop to handle adding/removing favorites
  isFavorite?: boolean; // Optional prop to indicate if it's a favorite
  isInFavorites?: boolean; // Optional prop to indicate if it's in the favorites section
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  year,
  onFavorite,
  isFavorite,
  isInFavorites,
}) => {
  return (
    <div style={styles.card}>
      <img src={poster} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>{year}</p>
      <button onClick={onFavorite} style={styles.button}>
        {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    width: "200px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  button: {
    marginTop: "10px",
  },
};

export default MovieCard;
