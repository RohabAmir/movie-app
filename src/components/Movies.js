import React from 'react'
import { useGlobalContext } from '../context';

const Movies = () => {
  const {movies} = useGlobalContext();
  return (
    <>
      {
        movies?.map((currMovie)=>{
          return(
            <div key={currMovie}>
              <h2>{currMovie.Title}</h2>
            </div>

          )
        })
      }
    </>
  )
}

export default Movies;
