import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './MovieCard.css';

const TvCard = ({ tv }) => {
    return (
        <div className='movie-card'>
            <Link to={`/tv/${tv.id}`} className='movie-link'>
                <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt={tv.name} />
                <h3 className='movie-title' title={tv.name}>{tv.name}</h3>
                <div className='movie-subtitle'>
                    <span>{tv.first_air_date.split('-')[0]}</span>
                    <div className='rating'>
                        <span>{tv.vote_average.toFixed(1)}</span>
                        <AiFillStar className='star-icon' />
                    </div>
                </div>
            </Link>
        </div >
    );
};

export default TvCard;
