import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [retryTimer, setRetryTimer]= useState(null)
  const [cancel, setCancelRetry] = useState(false)
   async function fetchMovies(){
    setIsLoading(true);
    setError(null)
    try{
    const response = await fetch('https://swapi.dev/api/films/')
    if(!response.ok){
      throw new Error('Something went wrong ....Retrying')
    }
    const data = await response.json()
    const fetchedData = data.results.map((item) => {
          return {
            id: item.episode_id,
            title: item.title,
            releaseDate: item.release_date,
            openingText: item.opening_crawl,
          };
        });
   setIsLoading(false);
  setMovies(fetchedData);
      }catch(error){
        setError(error.message)
        setIsLoading(false);
        setRetryTimer(setTimeout(() => {
          fetchMovies()
        }, 5000))
      }

  };

  const cancelRetry= () =>{
    clearInterval(retryTimer)
    setCancelRetry(true)
  }

  return (
    <React.Fragment>
      <section>
        {isLoading && <Loader />}
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
        {!isLoading && error && !cancel && (
          <>
            <p>{error}</p>
            <button onClick={fetchMovies}>Retrying....</button>
            <button onClick={cancelRetry}>Cancel Retry</button>
          </>
        )}
        {!isLoading && error && cancel && (
          <>
            <p>Nothing Found....</p>
          </>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
