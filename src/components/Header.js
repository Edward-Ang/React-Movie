// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <header>
      <Link className='header-logo' to='/'>
        <img className='logo' src='./favicon/favicon.ico' alt='logo' />
        <h2 className='name'>PopWatch</h2>
      </Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className='search-bar'
        />
        <button type="submit">Search</button>
      </form>
      <div className='utility'>
        <AiOutlineHeart className='utility-icon' />
        <AiOutlineBell className='utility-icon' />
        <AiOutlineFilter className='utility-icon' />
      </div>
    </header>
  );
};

export default Header;
