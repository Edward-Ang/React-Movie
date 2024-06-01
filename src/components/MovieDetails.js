import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovies } from '../api';
import { AiFillStar } from "react-icons/ai";
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setMovie(await fetchMovieDetails(id));
        setRecommend(await fetchMovies('popular'));
      } catch {
        setMovie(null);
        setRecommend([1, 2, 3]);
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
        <p className='movie-overview' >{movie.overview}</p>
        <p className='movie-date' >Release Date: {movie.release_date}</p>
        <div className='movie-rating' >
          <span>Rating: </span>
          <span className='movie-detail-rating' >{movie.vote_average.toFixed(1)}</span>
        </div>
        <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        {/* Add more details as needed */}
      </div>
      <div className='detail-side'>
        <h2>You May Also Like</h2>
        {recommend.slice(5, 10).map(movie => (
          <div className='similar-container' key={movie.id} movie={movie}>
            <img className='similar-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className='similar-detail'>
              <h3 className='movie-title' title={movie.title}>{movie.title}</h3>
              <div className='movie-subtitle'>
                <span>{movie.release_date.split('-')[0]}</span>
                <div className='rating'>
                  <span>{movie.vote_average.toFixed(1)}</span>
                  <AiFillStar className='star-icon' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;