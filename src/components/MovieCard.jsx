import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useEffect } from "react";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  useEffect(() => {
    console.log(`Rendering MovieCard for movie ID: ${movie.id}, Is Favorite: ${favorite}`);
  }, [favorite]);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      console.log(`Removing movie ID: ${movie.id} from favorites`);
      removeFromFavorites(movie.id);
    } else {
      console.log(`Adding movie ID: ${movie.id} to favorites`);
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;