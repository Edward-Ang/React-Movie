import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTvDetails, fetchTv } from '../api';
import SideTvCard from './SideTvCard';
import './MovieDetails.css';

const TvDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [tvDetails, recommendedMovies] = await Promise.all([
          fetchTvDetails(id),
          fetchTv('popular'),
        ]);
        setTv(tvDetails);
        setRecommend(recommendedMovies);
        if (tvDetails.genres) {
          setGenre(tvDetails.genres.map(genre => genre.name));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching tv details or recommendations:', error);
        setTv(null);
        setRecommend([]);
      }
    };

    fetchDetails();
  }, [id]);

  if (!tv) return <div>Loading...</div>;

  return (
    <div className="detail-wrapper">
      <img
        className="detail-poster"
        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
        alt={tv.name}
      />
      <div className="detail-container">
        <h1>{tv.name}</h1>
        <p className="movie-overview">{tv.overview}</p>
        <p className="movie-date">Release Date: {tv.first_air_date}</p>
        <div className="movie-rating">
          <span>Rating: </span>
          <span className="movie-detail-rating">{tv.vote_average.toFixed(1)}</span>
        </div>
        <div className='genres'>
          {genre.map(genre => (
            <span key={genre.id} className='genre-item' >{genre}</span>
          ))}
        </div>
      </div>
      <div className="detail-side">
        <h2>You May Also Like</h2>
        {recommend.slice(10, 15).map(tv => (
          <SideTvCard key={tv.id} tv={tv} />
        ))}
      </div>
    </div>
  );
};

export default TvDetails;