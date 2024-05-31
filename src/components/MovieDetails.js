import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api';
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setMovie(await fetchMovieDetails(id));
      } catch {
        setMovie(null);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className='detail-wrapper'>
      <img className='detail-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className='detail-container'>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default MovieDetails;
