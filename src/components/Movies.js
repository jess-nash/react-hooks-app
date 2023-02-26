import React from 'react';
import { MovieCard } from './MovieCard';

// import env from "react-dotenv"

// const tmdbKey = env.REACT_APP_API_KEY;
// const baseURL = "https://api.themoviedb.org/3"
// const searchURL = `${baseURL}/search/movie?api_key=${tmdbKey}`;

export const Movies = ({movies, loading, errorMessage}) => {
  return (
    <div className="movies">
      {loading && !errorMessage ? (
        <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
          ) : (
        movies.map((movie, index) => (
          <MovieCard key={`${index}-${movie.title}`} movie={movie} />
        ))
      )}
    </div>
  );
};
