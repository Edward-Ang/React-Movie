import React from "react";
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './SideMovieCard.css';

const SideMovieCard = ({ movie, id }) => {
    const getYear = (dateString) => {
        if (dateString) {
            return dateString.split('-')[0];
        }
        return '';
    };

    return (
        <Link to={`/movie/${movie.id}/${id}`} key={movie.id} movie={movie} className="similar-container" >
            <img className='similar-poster'
                src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://placehold.co/500x750.png'
                }
                alt={movie.title || movie.name} />
            <div className='similar-detail'>
                <h3 className='movie-title' title={movie.title || movie.name}>{movie.title ? movie.title : movie.name}</h3>
                <div className='movie-subtitle'>
                    <span>{getYear(movie.release_date) || getYear(movie.first_air_date)}</span>
                    <div className='rating'>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        <AiFillStar className='star-icon' />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SideMovieCard;