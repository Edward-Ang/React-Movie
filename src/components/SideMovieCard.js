import React from "react";
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './SideMovieCard.css';

const SideMovieCard = ({ movie, id }) => {
    return (
        <Link to={`/movie/${movie.id}/${id}`} key={movie.id} movie={movie} className="similar-container" >
            <img className='similar-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title || movie.name} />
            <div className='similar-detail'>
                <h3 className='movie-title' title={movie.title || movie.name}>{movie.title ? movie.title : movie.name}</h3>
                <div className='movie-subtitle'>
                    <span>{movie.release_date ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0]}</span>
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