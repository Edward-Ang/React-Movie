import axios from 'axios';

const API_KEY = 'd101d3c09aadebd6fb2d039f413cc1ac';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (type) => {
  const response = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchTv = async (type) => {
  const response = await axios.get(`${BASE_URL}/tv/${type}?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchTvDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};
