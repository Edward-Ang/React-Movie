// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Profile from "./pages/Profile/profile";
import Favourite from "./pages/Favourite/favourite";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import SearchResults from "./pages/SearchResults/SearchResults";
import MovieLists from './pages/MovieLists/MovieLists';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/backToTop';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const toggleLoginVisible = () => {
    setSignupVisible(false);
    setLoginVisible(!loginVisible);
  };

  const toggleSignupVisible = () => {
    setLoginVisible(false);
    setSignupVisible(!signupVisible);
  };

  const toggleProfileVisible = () => {
    setProfileVisible(!profileVisible);
  }

  return (
    <Router>
      <Header userDetails={{ user }} toggleProfileVisible={toggleProfileVisible} toggleLoginVisible={toggleLoginVisible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:obj/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movies/:type/:id" element={<MovieLists />} />
        <Route path="/favourite" element={ <Favourite /> } />
      </Routes>
      <Footer />
      <BackToTop />
      <Login loginVisible={loginVisible} toggleLoginVisible={toggleLoginVisible} toggleSignupVisible={toggleSignupVisible} />
      <Signup signupVisible={signupVisible} toggleSignupVisible={toggleSignupVisible} toggleLoginVisible={toggleLoginVisible} />
      <Profile userDetails={{user}} profileVisible={profileVisible} toggleProfileVisible={toggleProfileVisible} />
    </Router>
  );
}

export default App;
