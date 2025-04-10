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
  };

 
