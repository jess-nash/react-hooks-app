// It renders each movie. The movie object is simply passed into it as props.
//PRESENTATIONAL component!

import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

  export const Movie = ({movie}) => {
    const poster = movie.poster_path === null ? DEFAULT_PLACEHOLDER_IMAGE : `https://image.tmdb.org/t/p/original${movie.poster_path}`
    const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`

    return (
      <div className="movie">
        <a href={movieUrl} target="_default"><h1>{movie.title}</h1></a>
        <div>
          <img src={poster} alt={`The movie titled: ${movie.title}`} className="poster" />
        </div>
        <p>{movie.release_date}</p>
      </div>
    )
}
