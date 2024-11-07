import '../css/MenuBar.css';
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { userLogout } from '../fetch/LoginRegister';

function MenuBar() {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/main');
  };
  const handleMyPage = () => {
    navigate('/myPage');
  };
  const handleLogout = async () => {
    userLogout().then((response) => {
      if (response.status === 200) {
        navigate('/');
      }
    });
  };

  return (
    <div className="MenuBar">
      <div className="left-buttons">
        <button className="MainButton" onClick={handleMain}>Myweb</button>
        <button className="button">hello</button>
        <button className="button">hi</button>
      </div>
      <div className="right-buttons">
        <button className="LogoutButton" onClick={handleLogout}>Logout</button>
        <button className="button-right" onClick={handleMyPage}>MY</button>
      </div>
    </div>
  );
}

export default MenuBar;