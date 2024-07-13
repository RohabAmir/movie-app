import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../context";
import Loader from "./Loader/Loader";

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };


  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);


  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovies(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 800);
    return () => clearTimeout(timeout);
  }, [id]);

  const { Title } = movies;
  const movieName = Title?.substring(0, 30);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="movie-section">
      <div className="movie-card">
        <img src={movies.Poster} alt="movie detail img" />
        <div className="card-content">
          <p className="title">
            {movieName.length >= 30 ? `${movieName} ...` : movieName}
          </p>
          <p className="card-text">
            <span className="dot">
            {"->"} <span>Released:</span>
            </span>
            {movies.Released}
          </p>
          <p className="card-text">
            <span className="dot">
            {"->"} <span>Genre:</span>
            </span>
            {movies.Genre}
          </p>
          <p className="card-text">
            <span className="dot">
              {"->"} <span>IMDB Rating:</span>
            </span>
            {movies.imdbRating} / 10 
          </p>
          <p className="card-text">
            <span className="dot">
            {"->"} <span>Country:</span>
            </span>
            {movies.Country}
          </p>
          <button  onClick={handleBackClick}>
            <span>⇽ Back</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
