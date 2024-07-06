import React from "react";
import { useGlobalContext } from "../../context";
import "./Search.css";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();

  const handleReset = () => {
    setQuery("");
  };
  return (
    <>
      <div className="search-section">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="label">
            <input
              className="input"
              type="text"
              required
              placeholder="Search movies"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search Movies by title"
            />
            <div className="fancy-bg"></div>
            <button className="search " type="button" aria-label="Search">
              {/* Replace with actual SearchIcon component */}
              <span className="icon">🔍</span>
            </button>
            <button
              className="close-btn"
              type="reset"
              onClick={handleReset}
              aria-label="Clear search"
            >
              {/* Replace with actual CloseIcon component */}
              <span className="close-icon">✖</span>
            </button>
          </label>
        </form>
      </div>
      <div className="card-error">
          <p>{isError.show && isError.message}</p>
      </div>
    </>
  );
};

export default Search;
