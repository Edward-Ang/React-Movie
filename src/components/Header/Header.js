// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineUser, AiOutlineBell, AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';
import './Header.css';
import './HeaderMedia.css'

const Header = ({ userDetails, toggleProfileVisible, toggleLoginVisible }) => {
  const user = userDetails.user;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(true);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const mobileWidth = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDropdownClick = () => {
    setVisibleDropdown(!visibleDropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setQuery('');
  };

  const handleProfile = async () => {
    toggleProfileVisible();
  };

  const handleLogin = () => {
    toggleLoginVisible();
  }

  const handleFav = () => {
    if (user) {
      navigate('/favourite');
    } else {
      toggleLoginVisible();
    }
  }

  return (
    <header className={`header ${isScrolled ? 'colored' : 'transparent'}`}>
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
      {mobileWidth ? (
        <>
          <button className='utility-btn' onClick={handleDropdownClick}>
            {visibleDropdown ? (<AiOutlineClose className='utility-icon' />) : (<AiOutlineMenu className='utility-icon' />)}
          </button>
          {visibleDropdown && (
            <div className="dropdown-menu" id='header-dropdown-menu'>
              <div clasName="dropdown-item" id='header-dropdown-item'>
                {user ? (
                  <img
                    className='profile-pic'
                    src={user.picture || '/images/fox-avatar.png'}
                    alt={user.name}
                    title={user.name}
                    onClick={handleProfile}
                  />) : (
                  <button className='utility-btn' id='profile-btn' onClick={handleLogin}>
                    <div className='btn-container'>
                      <span>Profile</span>
                      <AiOutlineUser className='utility-icon' id='user-icon' />
                    </div>
                  </button>
                )}
              </div>
              <div clasName="dropdown-item" id='header-dropdown-item'>
                <button className='utility-btn' id='favourite-btn' onClick={handleFav} >
                  <div className='btn-container'>
                    <span>Favourite</span>
                    <AiOutlineHeart className='utility-icon' id='heart-icon' />
                  </div>
                </button>
              </div>
              <div clasName="dropdown-item" id='header-dropdown-item'>
                <button className='utility-btn' id='notification-btn' >
                  <div className='btn-container'>
                    <span>Notification</span>
                    <AiOutlineBell className='utility-icon' id='bell-icon' />
                  </div>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='utility'>
          <button className='utility-btn' onClick={handleFav} ><AiOutlineHeart className='utility-icon' /></button>
          <button className='utility-btn'><AiOutlineBell className='utility-icon' /></button>
          {user ? (
            <img
              className='profile-pic'
              src={user.picture || '/images/fox-avatar.png'}
              alt={user.name}
              title={user.name}
              onClick={handleProfile}
            />) : (
            <button className='utility-btn' onClick={handleLogin}><AiOutlineUser className='utility-icon' /></button>
          )}
        </div>
      )}
    </header >
  );
};

export default Header;
