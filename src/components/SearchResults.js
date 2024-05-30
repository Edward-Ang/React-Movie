import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../api';
import MovieCard from './MovieCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try{
        setResults(await searchMovies(query));
      }catch{
        setResults([1,2,3]);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h2>Search Results</h2>
      <div className="movie-list">
        {results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default SearchResults;
