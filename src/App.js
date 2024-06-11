// src/App.js
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from "axios";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Home from "./pages/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchResults from './components/SearchResults/SearchResults';
import MovieLists from './components/MovieLists/MovieLists';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/backToTop';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={ user ? <Home /> :  <Navigate to="/login" />} />
        <Route path="/movie/:obj/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movies/:type/:id" element={<MovieLists />} />
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
