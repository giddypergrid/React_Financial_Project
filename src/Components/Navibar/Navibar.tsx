import React, { ChangeEvent, SyntheticEvent } from 'react';
import './Navibar.css';
import Logo from './Logo.png';
import { useNavigate } from 'react-router-dom';

interface NavibarProps {

}

const Navibar: React.FC<NavibarProps> = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <img src={Logo} alt="Stock App Logo" className="navbar-logo" />

      <div className="navbar-buttons">
        <button className="navbar-button dashboard">
          Dashboard
        </button>
        <button className="navbar-button login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="navbar-button signup" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navibar; 