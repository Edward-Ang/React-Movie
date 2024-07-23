import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, similarMovies, fetchTvDetails, fetchMovies, fetchTv, fetchReviews, fetchVideos } from '../../api';
import SideMovieCard from '../../components/SideMovieCard/SideMovieCard'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import FavCard from '../../components/FavCard/FavCard';
import Loader from '../../components/Loader/Loader';
import { AiOutlineHeart, AiOutlinePlayCircle, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';
import './MovieDetails.css';
import './MovieDetailsMedia.css';
import axios from 'axios';

const MovieDetails = ({ user, toggleLoginVisible }) => {
  const { obj, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [genre, setGenre] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [watch, setWatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favCardVisible, setFavCardVisible] = useState(false);
  const [faved, setFaved] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const mobileWidth = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videos = await fetchVideos(id, obj);
        const trailer = videos.find(video => (video.type === "Trailer" || video.type === "Opening Credits") && video.site === "YouTube");
        setTrailer(trailer ? trailer.key : null);
      } catch {
        setTrailer(null);
      }
    };

    const fetchDetails = async () => {
      try {
        if (id === 'movie') {
          const [movieDetails, recommendedMovies] = await Promise.all([
            fetchMovieDetails(obj),
            similarMovies('movie', obj),
          ]);
          setMovie(movieDetails);
          setRecommend(recommendedMovies.length !== 0 ? recommendedMovies : await fetchMovies('popular'));
          setGenre(movieDetails.genres ? movieDetails.genres.map(genre => genre.name) : []);
          if (user && user.email) {
            checkFavourite(movieDetails.id, user.email); // Ensure movieDetails.id is used instead of movie.movieId
          }
        } else {
          const [tvDetails, recommendedTv] = await Promise.all([
            fetchTvDetails(obj),
            similarMovies('tv', obj),
          ]);
          setMovie(tvDetails);
          setRecommend(recommendedTv.length !== 0 ? recommendedTv : await fetchTv('popular'));
          setGenre(tvDetails.genres ? tvDetails.genres.map(genre => genre.name) : []);
          if (user && user.email) {
            checkFavourite(tvDetails.id, user.email); // Ensure tvDetails.id is used instead of movie.movieId
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
    };

    const resetVideo = () => {
      setWatch(false);
    };

    const checkFavourite = async (movieId, email) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/checkFavourite`, {
          params: { movieId, email }
        });
        console.log('Fetched data:', response.data.exists);
        setFaved(response.data.exists);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Server Error:', error.response.data.message || error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('No Response Received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Request Error:', error.message);
        }
      }
    };

    const checkUrl = async () => {
      const url = `https://vidsrc.pro/embed/movie/${obj}`;
      try {
        const response = await fetch(url);
        if (response.status === 404) {
          console.log('cant fetch video 404');
        } else {
          console.log(response.status);
          setEmbedUrl(url);
        }
      } catch (error) {
        console.error('Error fetching the URL:', error);
      }
    };

    fetchVideo();
    fetchDetails();
    fetchMovieReviews();
    resetVideo();
    checkUrl();
  }, [obj, id, user]);

  const handleWatch = () => {
    setWatch(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const toggleFavCardVisible = () => {
    if (user) {
      setFavCardVisible(!favCardVisible);
    } else {
      toggleLoginVisible();
    }
  }

  if (!movie) return <Loader />;

  return (
    <>
      {!faved && (
        <FavCard id={id} userDetail={user} movie={movie} favCardVisible={favCardVisible} toggleFavCardVisible={toggleFavCardVisible} />
      )}
      <div className="detail-wrapper">
        <div className='detail-left'>
          {watch && (
            <div className='detail-video'>
              {loading &&
                <Loader />
              }
              {embedUrl !== '' ? (
                <iframe
                  src={embedUrl}
                  allowFullScreen
                  title={movie.title || movie.name}
                  className='video-iframe'
                  onLoad={() => setLoading(false)}
                ></iframe>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer}`}
                  allowFullScreen
                  title={movie.title || movie.name}
                  className='video-iframe'
                  onLoad={() => setLoading(false)}
                ></iframe>
              )}
            </div>
          )}
          <div className='detail-left-top'>
            <div className='poster-container'>
              <img
                className="detail-poster"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://placehold.co/500x750.png'
                }
                alt={movie.title || movie.name}
              />
              <button className="fav-btn" onClick={toggleFavCardVisible} >
                {faved ? (
                  <AiFillHeart className='heart-icon' />
                ) : (
                  <AiOutlineHeart className='heart-icon' />
                )}
              </button>
            </div>
            <div className="detail-container">
              <h1>{movie.title ? movie.title : movie.name}</h1>
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-date">Release Date: {movie.release_date ? movie.release_date : movie.first_air_date}</p>
              <div className="movie-rating">
                <span>Rating: </span>
                <span className="movie-detail-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
              <div className='genres'>
                {genre.slice(0, mobileWidth ? 2 : 3).map((genreName, index) => (
                  <span key={index} className='genre-item'>{genreName === 'Science Fiction' ? 'Sci-Fi' : genreName}</span>
                ))}
              </div>
              {trailer &&
                <button className='trailer-btn' onClick={handleWatch}>
                  <AiOutlinePlayCircle className='play-icon' />
                  Watch
                </button>
              }
            </div>
          </div>
          <div className='detail-review'>
            <div className="review-section">
              <h2>Reviews</h2>
              <div className="review-list">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))
                ) : (
                  <div className='no-reviews'>
                    <AiOutlineComment className='comment-icon' />
                    No reviews
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="detail-right">
          <h2>You May Also Like</h2>
          <div className="side-movie-container">
            {recommend.map(movie => (
              <SideMovieCard key={movie.id} movie={movie} id={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
