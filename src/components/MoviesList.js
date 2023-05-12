import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  const deleteMovie = (id)=>{
    console.log(id)
    props.deleteMovie(id)
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          id = {movie.id}
          deleteMovie = {deleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
