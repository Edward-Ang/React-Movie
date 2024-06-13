import React, { useState } from 'react';
import axios from 'axios';
import './FavCard.css';

function FavCard({ userDetail, movie, favCardVisible, toggleFavCardVisible }) {
    const user = userDetail;
    const [favrating, setFavrating] = useState('');

    const handleFavCardVisible = () => {
        toggleFavCardVisible();
    }

    const handleContainerClick = (event) => {
        // Prevent propagation of click event to parent elements
        event.stopPropagation();
    }

    const handleFav = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/favourite`, {
                movie,
                user,
                favrating,
            });
            console.log(response.data);
            handleFavCardVisible();
                } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {favCardVisible && (
                <div className="fav-bg" onClick={handleFavCardVisible}>
                    <div className="cardContainer" id='favCardContainer' onClick={handleContainerClick}>
                        <div className="card" id='favCard'>
                            {/*<img
                                className='fav-poster'
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                        : 'https://placehold.co/500x750.png'
                                }
                                alt={movie.title || movie.name}
                            />*/}
                            <div className="fav-footer">
                                <form className='fav-form' onSubmit={handleFav}>
                                    <div className='fav-rating'>
                                        <input
                                            className='fav-input'
                                            type='number' name='favrating'
                                            step={0.1} max={10} min={0} placeholder='0.0'
                                            onChange={(e) => { setFavrating(e.target.value) }}
                                            required
                                        />
                                        <span>/10</span>
                                    </div>
                                    <button type='submit' className="trailer-btn" id="add-btn">Add to Favourites</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavCard;