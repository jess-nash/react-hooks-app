import '../App.css';
import React, { useReducer, useEffect } from 'react';
import { Header } from './Header'
import { Movie } from './Movie';
import { Search } from './Search';
import env from "react-dotenv"

const tmdbKey = env.REACT_APP_API_KEY;
const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  // const [loading, setLoading] = useState();
  // const [movies, setMovies] = useState();
  // const [errorMessage, setErrorMessage] = useState();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=> {
    fetch(MOVIE_API_URL)
      .then(response => response.json)
      .then(jsonResponse => {
        // setMovies(jsonResponse.Search);
        // setLoading(false);
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      })
  }, []);

  const search = searchValue => {
    // setLoading(true);
    // setErrorMessage(null);
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`${MOVIE_API_URL}&query=${searchValue}`)
      .then(response => response.json)
      .then(jsonResponse => {
        if (jsonResponse === 'True') {
          // setLoading(false);
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          // setErrorMessage(jsonResponse.Error);
          // setLoading(false);
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      })
  }

  const { movies, errorMessage, loading } = state;


  return (
    <div className="App">
      <Header text="Cinema Seeker"/>
      <Search search={search}/>
      <p className="App-intro">Here's some of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
          ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
