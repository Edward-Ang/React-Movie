import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import MovieCard from './MovieCard';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try{
        setTrendingMovies(await fetchMovies('trending'));
        setPopularMovies(await fetchMovies('popular'));
        setTopRatedMovies(await fetchMovies('top_rated'));
      }catch{
        setTrendingMovies([1,2,3]);
        setPopularMovies([1,2,3]);
        setTopRatedMovies([1,2,3]);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div>
      <h2>Trending Movies</h2>
      <div className="movie-list">
        {trendingMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <h2>Popular Movies</h2>
      <div className="movie-list">
        {popularMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <h2>Top Rated Movies</h2>
      <div className="movie-list">
        {topRatedMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
