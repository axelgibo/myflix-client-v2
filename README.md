# MyFlix Client Application

## Overview

MyFlix is a web application that provides users with access to information about a wide selection of movies, including details about their genres, directors, and descriptions. Users can browse the movie library, sign up for an account, log in, view detailed information about individual movies, save movies to their list of favorites, and update their profile information. This client-side application is built using React.

## Key Features

* **User Authentication:**
    * **Sign Up:** New users can create an account by providing a username, password, email, and date of birth.
    * **Login:** Existing users can log in securely using their username and password.
    * **Logout:** Logged-in users can securely log out of their session.
* **Browse Movie Library:**
    * Displays a list of all available movies with their titles and poster images.
* **View Movie Details:**
    * Users can click on a movie to view more detailed information, including the title, description, genre, director, and a link to the director's page.
* **Favorite Movies:**
    * Logged-in users can add movies to and remove movies from their list of favorite movies. This information is persisted for their account.
* **User Profile:**
    * Logged-in users can access their profile to view their account details (username, email, date of birth, favorite movies).
    * Users can update their profile information (username, password, email, date of birth).
* **Movie Title Search:**
    * A search bar allows users to filter the displayed movie list by typing in keywords from the movie title. The list updates dynamically to show only movies whose titles include the entered term (case-insensitive search).

## Technologies Used

**Frontend:**

* **React:** A JavaScript library for building user interfaces.
* **React Router DOM:** For handling client-side routing and navigation within the application.
* **React Bootstrap:** A UI library providing pre-built React components styled with Bootstrap.
* **Parcel:** A zero-configuration web bundler used for building and serving the application.
* **Sass:** A CSS preprocessor for enhanced styling.

**Backend (API):**

* (Note: This README focuses on the frontend, but the application interacts with a RESTful API. The backend technologies are not the primary focus here but might include Node.js, Express, and a database like MongoDB.)

## Installation Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repository-url>
    ```
    (Replace `<your-github-repository-url>` with the actual URL of your repository)
2.  **Navigate to the project directory:**
    ```bash
    cd myflix-client-new
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
    (or `yarn install` if you are using Yarn)
4.  **Start the development server:**
    ```bash
    npm start
    ```
    (or `yarn start`)

    This will typically run the application in your browser at `http://localhost:3000`.

## Usage Instructions

1.  **Access the application** in your web browser.
2.  **Browse Movies:** The main view displays a list of all movies.
3.  **Search Movies:** Use the "Search by Title" input field at the top of the movie list to filter movies by title.
4.  **View Movie Details:** Click on a movie card to navigate to a detailed view of the movie.
5.  **Sign Up/Login:** If you don't have an account, click on the "Sign Up" link in the navigation bar. If you have an account, use the "Login" link to access your personalized features.
6.  **Favorite Movies (Logged In):** On the movie details view, logged-in users can typically find a button to add or remove the movie from their favorites. These are usually displayed on the user's profile page.
7.  **User Profile (Logged In):** Click on your username in the navigation bar to access your profile page, where you can view and update your information.
8.  **Logout:** Click the "Logout" button in the navigation bar to end your session.


## Link to Hosted App

https://myflix-client-v2.netlify.app

## Link to GitHub Repository

https://github.com/axelgibo/myflix-client-v2

