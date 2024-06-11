// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import './Header.css';

const Header = (userDetails) => {
  const user = userDetails.user;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setQuery('');
  };

  const handleUser = () => {
    navigate('/login');
  }

  const handleLogout = async () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const handleProfile = async () => {
    
  }

  return (
    <header>
      <Link className='header-logo' to='/'>
        <img className='logo' src='./favicon.ico' alt='logo' />
        <h2 className='name'>PopWatch</h2>
      </Link>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="search-bar"
            required
          />
          <button type="submit" className="search-button"><AiOutlineSearch className='search-icon' /></button>
        </div>
      </form>
      <div className='utility'>
        <button className='utility-btn' ><AiOutlineHeart className='utility-icon' /></button>
        <button className='utility-btn' ><AiOutlineBell className='utility-icon' /></button>
        {user ? (
          <img className='profile-pic' src={user.picture} alt={user.name} title={user.name} onClick={handleProfile} />
        ) : (
          <button className='utility-btn' onClick={handleUser} ><AiOutlineUser className='utility-icon' /></button>
        )}
        <button className='utility-btn' onClick={handleLogout} >Logout</button>
        </div>
    </header>
  );
};

export default Header;
