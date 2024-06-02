import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovies } from '../api';
import SideMovieCard from './SideMovieCard';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [movieDetails, recommendedMovies] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovies('popular'),
        ]);
        setMovie(movieDetails);
        setRecommend(recommendedMovies);
        if (movieDetails.genres) {
          setGenre(movieDetails.genres.map(genre => genre.name));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching movie details or recommendations:', error);
        setMovie(null);
        setRecommend([]);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="detail-wrapper">
      <img
        className="detail-poster"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="detail-container">
        <h1>{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p>
        <p className="movie-date">Release Date: {movie.release_date}</p>
        <div className="movie-rating">
          <span>Rating: </span>
          <span className="movie-detail-rating">{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className='genres'>
          {genre.map(genre => (
            <span key={genre.id} className='genre-item' >{genre}</span>
          ))}
        </div>
      </div>
      <div className="detail-side">
        <h2>You May Also Like</h2>
        {recommend.slice(10, 15).map(movie => (
          <SideMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;