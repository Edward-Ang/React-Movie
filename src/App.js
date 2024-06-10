// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SearchResults from './components/SearchResults/SearchResults';
import MovieLists from './components/MovieLists/MovieLists';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/backToTop';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:obj/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movies/:type/:id" element={<MovieLists />} />
      </Routes>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
