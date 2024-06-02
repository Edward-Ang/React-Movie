// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import SearchResults from './components/SearchResults';
import MovieLists from './components/MovieLists';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movies/:id" element={<MovieLists />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
