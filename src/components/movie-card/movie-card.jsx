import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (storedUser && storedUser.FavoriteMovies) {
      setIsFavorite(storedUser.FavoriteMovies.includes(movie._id));
    }
  }, [movie._id, storedUser]);

  const handleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";
    fetch(
      `https://myflix-application-318482b84ceb.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`,
      {
        method: method,
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    ).then(() => {
      setIsFavorite(!isFavorite);
      const updatedUser = {
        ...storedUser,
        FavoriteMovies: isFavorite
          ? storedUser.FavoriteMovies.filter((id) => id !== movie._id)
          : [...storedUser.FavoriteMovies, movie._id],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    });
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={movie.ImagePath} className="img-fluid" />
      <Card.Body>
        <Card.Title className="text-center">{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary" className="btn btn-primary p-2">
            View Movie
          </Button>
        </Link>
        {storedUser && (
          <Button
            variant={isFavorite ? "danger" : "success"}
            onClick={handleFavorite}
            className="p-2"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};