import React from "react";
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './SideMovieCard.css';

const SideMovieCard = ({ tv }) => {
    return (
        <Link to={`/tv/${tv.id}`} key={tv.id} tv={tv} className="similar-container" >
            <img className='similar-poster' src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt={tv.name} />
            <div className='similar-detail'>
                <h3 className='movie-title' title={tv.name}>{tv.name}</h3>
                <div className='movie-subtitle'>
                    <span>{tv.first_air_date.split('-')[0]}</span>
                    <div className='rating'>
                        <span>{tv.vote_average.toFixed(1)}</span>
                        <AiFillStar className='star-icon' />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SideMovieCard;