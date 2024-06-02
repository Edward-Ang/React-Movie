import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchMovies } from "../api";
import MovieCard from "./MovieCard";

const MovieLists = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [section, setSection] = useState('');

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                setMovies(await fetchMovies(id));
                if(id === 'popular'){
                    setSection('Popular Movies');
                }else{
                    setSection('Upcoming Movies');
                }
            } catch {
                setMovies([]);
            }
        }

        fetchAllMovies();
    }, [id]);

    return (
        <div className="home-div">
            <div className='movie-section' >
                <div className='section-header'>
                    <h2>{section}</h2>
                </div>
                <div className="movie-container">
                    <div className="movie-list">
                        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieLists;