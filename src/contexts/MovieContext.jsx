import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      console.log("Loaded favorites from localStorage:", JSON.parse(storedFavs));
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    console.log("Updating localStorage with favorites:", favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      console.log("Adding to favorites:", movie);
      setFavorites((prev) => [...prev, movie]);
    } else {
      console.log("Movie is already a favorite:", movie);
    }
  };

  const removeFromFavorites = (movieId) => {
    console.log("Removing from favorites:", movieId);
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    const result = favorites.some((movie) => movie.id === movieId);
    console.log(`Checking if movie ${movieId} is a favorite:`, result);
    return result;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
