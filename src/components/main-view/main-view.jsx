import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredMovies, setFilteredMovies] = useState([]); // State for filtered movies

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-application-318482b84ceb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); // Initialize filtered movies with all movies
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(term)
    );
    setFilteredMovies(filtered);
  };

  return (
    <>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row>
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <MovieDetails movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={12}>
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-3 form-control" // Added basic styling
                  />
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-5" md={3} key={movie._id}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </>
  );
};

const MovieDetails = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <>
      {movie ? <MovieView movie={movie} /> : <div>Movie not found</div>}
    </>
  );
};

export default MainView;