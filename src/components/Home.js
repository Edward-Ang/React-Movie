import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import MovieCard from './MovieCard';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setPopularMovies(await fetchMovies('popular'));
        setUpcomingMovies(await fetchMovies('upcoming'));
      } catch {
        setPopularMovies([1, 2, 3]);
        setUpcomingMovies(['failed']);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className="home-div">
      <div className='movie-section' >
        <div className='section-header'>
          <h2>Popular Movies</h2>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {popularMovies.slice(0, 5).map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </div>
      </div>
      <div className='movie-section' >
        <div className='section-header'>
          <h2>Upcoming Movies</h2>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {upcomingMovies.slice(0, 5).map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
