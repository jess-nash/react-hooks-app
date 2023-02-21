import './stylesheets/App.scss';
import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar'
import { Movie } from './components/Movie';
import { Search } from './components/Search';
import env from "react-dotenv"

const tmdbKey = env.REACT_APP_API_KEY;
const baseURL = "https://api.themoviedb.org/3"
const searchURL = `${baseURL}/search/movie?api_key=${tmdbKey}`;
// const query = "Kiki's delivery service"

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
    fetch(`${baseURL}/movie/popular?api_key=${tmdbKey}`)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.results);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`${searchURL}&query=${searchValue}`)
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
      <NavBar text="Flick Finder" />
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
