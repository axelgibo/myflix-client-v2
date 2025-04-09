// movie-image.jsx
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

 const MovieImage = ({ movieId, storedToken }) => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null); // Added error state
    
  useEffect(() => {
    console.log(`MovieImage useEffect triggered for movieId: ${movieId}`); // Debugging log

    const fetchMovie = async (movieId, storedToken) => {
      try {
        console.log(`fetchMovie: Starting fetch for movieId: ${movieId}`);
        const response = await fetch(
          `https://myflix-application-318482b84ceb.herokuapp.com/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log(`fetchMovie: Response received for movieId: ${movieId}`, response);
        if (!response.ok) {
          console.error(`fetchMovie: Failed to fetch movie with ID: ${movieId}`, response.status);
          setError(`Failed to fetch movie with ID: ${movieId}, status: ${response.status}`);
          return null;
        }
        console.log(`fetchMovie: Response OK, parsing JSON for movieId: ${movieId}`);
        const data = await response.json();
        console.log(`fetchMovie: Movie data received for movieId: ${movieId}`, data);
        return data;
      } catch (error) {
        console.error(`fetchMovie: Error fetching movie with ID: ${movieId}`, error);
        setError(`fetchMovie: Error fetching movie with ID: ${movieId}, error: ${error.message}`);
        return null;
      }
    };

    const getMovie = async () => {
      const movieData = await fetchMovie(movieId, storedToken);
      setMovie(movieData);
    };
    getMovie();
  }, [movieId, storedToken]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieImage;