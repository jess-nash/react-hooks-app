import '../stylesheets/App.scss';
import React, { useState, useEffect } from 'react';
import { Header } from './Header'
import { Movie } from './Movie';
import { Search } from './Search';
import env from "react-dotenv"

const tmdbKey = env.REACT_APP_API_KEY;
const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}`;
const query = "Kiki's delivery service"

// const initialState = {
//   loading: true,
//   movies: [],
//   errorMessage: null
// };


// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state,
//         loading: true,
//         errorMessage: null
//       };
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         movies: action.payload
//       };
//     case "SEARCH_MOVIES_FAILURE":
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.error
//       };
//     default:
//       return state;
//   }
// };

const App = () => {
  // renders a ‘loading…’ text when loading is set to true
  const [loading, setLoading] = useState(true);

  //used to handle the movies array that is gotten from the server
  const [movies, setMovies] = useState([]);

  //used to handle any errors that might occur when making the API request
  const [errorMessage, setErrorMessage] = useState(null);

  // This hook basically lets you perform side effects in your function components.
  // Side effects, e.g. data fetching, subscriptions, and manual DOM manipulations.
  useEffect(() => {
    fetch(`${MOVIE_API_URL}&query=${query}`)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.results);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`${MOVIE_API_URL}&query=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.results.length > 0) {
          setMovies(jsonResponse.results);
          setLoading(false);
        } else {
          setErrorMessage("No results.");
          setLoading(false);
        }
      });
  };


  return (
    <div className="App">
      <Header text="Flick Finder" />
      <Search search={search} />
      <p className="App-intro">
        {!loading && !errorMessage ? "Here's some cool movies:" : ""}
      </p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
            ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
