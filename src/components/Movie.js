// It renders each movie. The movie object is simply passed into it as props.
//PRESENTATIONAL component!

import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

export const Movie = ({movie}) => {
  const poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  // if the movie's poster's value is set to "N/A" then the const poster is set to the default img,
  // if not, movie.poster is set to poster

  return (
    <div className="movie">
      <h1>{movie.title}</h1>
      <div>
        <img src={poster} alt={`The movie titled: ${movie.title}`} className="poster" />
        {/* <img alt={`The movie titled: ${movie.Title}`} /> */}
      </div>
      <p>{movie.release_date}</p>
    </div>
  )
}
