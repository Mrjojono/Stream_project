import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Register from './components/Register';
import React from 'react';
import Header from './components/header';
import Stream from './pages/Stream';

const login = true;

function App() {
  return (
    <Router>
      <Layout login={login} />
    </Router>
  );
}

function Layout({ login }) {
  const location = useLocation();
  const showHeader = location.pathname === "/" || location.pathname === "/Stream";

  return (
    <>
      {showHeader && <Header login={login} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Stream" element={<Stream/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;