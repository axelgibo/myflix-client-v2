import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>

      <h2>{movie.Title}</h2>
      <img src={movie.ImagePath} alt={movie.Title} className="movie-image" />
      <p>
        <strong>Description:</strong> {movie.Description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre.Name}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director.Name}
      </p>
      {/* Add more movie details here */}
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    // Add other movie properties here if needed
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
