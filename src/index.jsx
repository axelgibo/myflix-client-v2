import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.scss';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your application with BrowserRouter */}
      <MyFlixApplication />
    </BrowserRouter>
  </React.StrictMode>
);