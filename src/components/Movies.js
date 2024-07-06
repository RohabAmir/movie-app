import React from 'react'
import { useGlobalContext } from '../context';
import { NavLink } from 'react-router-dom';
import Loader from './Loader/Loader';

const Movies = () => {
  const { movies, isLoading } = useGlobalContext();

  if(isLoading){
    return(
      <Loader/>
    )
  };

  return (
    <section className='movie-page'>
      <div className='container grid grid-4-col'>
        {movies.map((currMovie)=>{
          const { Title, Poster, imdbID } = currMovie;
          const movieName = Title.substring(0,15);
          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className='card'>
                <div className='card-info'>
                  <h2>
                      {movieName.length >= 15 ? `${movieName} ...` : movieName}
                    </h2>
                    <img
                      src={Poster}
                      alt={imdbID}
                    />
                </div>
                
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
    
  )
}

export default Movies;
