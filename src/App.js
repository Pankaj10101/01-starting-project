import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   async function fetchMovies(){
    setIsLoading(true);

    const response = await fetch('https://swapi.dev/api/films/')
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

  };

  return (
    <React.Fragment>
      <section>
        {isLoading && <Loader />}
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
