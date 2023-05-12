import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';
import AddMovieForm from './components/Input/AddMovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [retryTimer, setRetryTimer]= useState(null)
  const [cancel, setCancelRetry] = useState(false)
  const fetchMovies = useCallback( async ()=>{
    setIsLoading(true);
    setError(null)
    try{
    const response = await fetch('https://react-movies-d4095-default-rtdb.firebaseio.com/movies.json')
    if(!response.ok){
      throw new Error('Something went wrong ....Retrying')
    }
    const data = await response.json()
    const loadedMovies = [];

    for(const key in data) {
      loadedMovies.push({
        id : key,
        title : data[key].title,
        releaseDate : data[key].releaseDate,
        openingText : data[key].openingText,
      })
    }

   setIsLoading(false);
  setMovies(loadedMovies);
      }catch(error){
        setError(error.message)
        setIsLoading(false);
        setRetryTimer(setTimeout(() => {
          fetchMovies()
        }, 5000))
      }

  }, [])

  // useEffect(()=>{
  //   fetchMovies()
  // }, [fetchMovies])

   const addMovieHandler = async (movie)=>{
    await  fetch('https://react-movies-d4095-default-rtdb.firebaseio.com/movies.json', {
      method :'POST',
      body : JSON.stringify(movie),
      headers : {
        'Content-Type' : 'application/json'
      }
    })


  }

  const cancelRetry= () =>{
    clearInterval(retryTimer)
    setCancelRetry(true)
  }

  const deleteMovie = async (id) => {
    await fetch(`https://react-movies-d4095-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    await fetchMovies();
  };
  

  return (
    <>
    <section>
    <AddMovieForm addMovieHandler= {addMovieHandler}/>
    </section>
      <section>
        {isLoading && <Loader />}

        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} deleteMovie = {deleteMovie} />
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
    </>
  );
}

export default App;
