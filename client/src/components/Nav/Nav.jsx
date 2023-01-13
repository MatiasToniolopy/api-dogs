import React from 'react'
import Search from '../Search/Search';
import {useNavigate} from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create');
    }
    
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <a href="#!" className="navbar-brand">Dogs App</a>
        <button className="btn btn-outline-success" onClick={handleClick}>Create Dog</button>
        <Search />
      </div>
    </nav>
  );
}

export default Nav