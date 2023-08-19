import React from 'react';
import Man from "../../assests/img/man.png";
import "./AdminHead.css"
import { Link } from 'react-router-dom';

const AdminHead = () => {
  return (
    <header className='adminHomeHead'>
        <div className="head">
          <div className="head_left">
            <Link className="icon" to="/home">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <div className="image">
              <img src={Man} alt="man"/>
            </div>
            <div className="text">
              <h5>Alina</h5>
              <h4>Admin</h4>
            </div>
          </div>
          <div className="head_right">
            <i className="fa-regular fa-rectangle-list"></i>
          </div>
        </div>
    </header>
  )
}

export default AdminHead