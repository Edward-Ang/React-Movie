import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, similarMovies, fetchTvDetails, fetchMovies, fetchTv, fetchReviews } from '../api';
import SideMovieCard from './SideMovieCard';
import ReviewCard from './ReviewCard';
import './MovieDetails.css';

const MovieDetails = () => {
  const { obj, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [genre, setGenre] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id === 'movie') {
          const [movieDetails, recommendedMovies] = await Promise.all([
            fetchMovieDetails(obj),
            similarMovies('movie', obj),
          ]);
          setMovie(movieDetails);
          if (recommendedMovies.length !== 0) {
            setRecommend(recommendedMovies);
          } else {
            setRecommend(await fetchMovies('popular'));
          }
          if (movieDetails.genres) {
            setGenre(movieDetails.genres.map(genre => genre.name));
          }
        } else {
          const [tvDetails, recommendedTv] = await Promise.all([
            fetchTvDetails(obj),
            similarMovies('tv', obj),
          ]);
          setMovie(tvDetails);
          if (recommendedTv.length !== 0) {
            setRecommend(recommendedTv);
          } else {
            setRecommend(await fetchTv('popular'));
          }
          if (tvDetails.genres) {
            setGenre(tvDetails.genres.map(genre => genre.name));
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (movieError) {
        console.error('Error fetching TV details or recommendations:', movieError);
        setMovie(null);
        setRecommend([]);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        setReviews(await fetchReviews(obj, id));
      } catch {
        setReviews([]);
      }
    }

    fetchDetails();
    fetchMovieReviews();
  }, [obj, id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="detail-wrapper">
      <div className='detail-left'>
        <div className='detail-left-top'>
          <img
            className="detail-poster"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://placehold.co/500x750.png'
            }
            alt={movie.title || movie.name}
          />
          <div className="detail-container">
            <h1>{movie.title ? movie.title : movie.name}</h1>
            <p className="movie-overview">{movie.overview}</p>
            <p className="movie-date">Release Date: {movie.release_date ? movie.release_date : movie.first_air_date}</p>
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
        </div>
        <div className='detail-review'>
          <div class="review-section">
            <h2>Reviews</h2>
            <div class="review-list">
              {reviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="detail-right">
        <h2>You May Also Like</h2>
        {recommend.map(movie => (
          <SideMovieCard key={movie.id} movie={movie} id={id} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;