import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MovieImage from "./movie-image";

export const ProfileView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://myflix-application-318482b84ceb.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setFavoriteMovies(data.FavoriteMovies);
        console.log("ProfileView: favoriteMovies array:", data.FavoriteMovies); // Added console log
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday);
      });
  }, [user.Username, storedToken]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `https://myflix-application-318482b84ceb.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }),
      }
    ).then(() => {
      alert("Profile updated successfully!");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          Username: username,
          Email: email,
          Birthday: birthday,
        })
      );
      setUser({
        ...user,
        Username: username,
        Email: email,
        Birthday: birthday,
      });
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(
        `https://myflix-application-318482b84ceb.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      ).then(() => {
        localStorage.clear();
        navigate("/login");
      });
    }
  };

  const fetchMovie = async (movieId, storedToken) => {
    try {
      console.log(`fetchMovie: Starting fetch for movieId: ${movieId}`);
      const response = await fetch(
        `https://myflix-application-318482b84ceb.herokuapp.com/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(
        `fetchMovie: Response received for movieId: ${movieId}`,
        response
      );
      if (!response.ok) {
        console.error(
          `fetchMovie: Failed to fetch movie with ID: ${movieId}`,
          response.status
        );
        return null;
      }
      console.log(
        `fetchMovie: Response OK, parsing JSON for movieId: ${movieId}`
      );
      const data = await response.json();
      console.log(
        `fetchMovie: Movie data received for movieId: ${movieId}`,
        data
      );
      return data;
    } catch (error) {
      console.error(
        `fetchMovie: Error fetching movie with ID: ${movieId}`,
        error
      );
      return null;
    }
  };

    useEffect(() => {
      const getMovie = async () => {
        try {
          const movieData = await fetchMovie(movieId, storedToken);
          setMovie(movieData);
        } catch (err) {
          setError(err);
        }
      };
      getMovie();
    }, [movieId, storedToken]);

    if (error) {
      return <div>Error loading movie.</div>; // Display error message
    }

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

  return (
    <Card>
      <Card.Body>
        <Card.Title>Your Profile</Card.Title>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
        <Button variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
        <Card.Title>Favorite Movies</Card.Title>
        <Row>
          {favoriteMovies &&
            favoriteMovies.map((movieId) => (
              <Col key={movieId}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MovieImage movieId={movieId} storedToken={storedToken} />
                </React.Suspense>
              </Col>
            ))}
        </Row>
      </Card.Body>
    </Card>
  );
