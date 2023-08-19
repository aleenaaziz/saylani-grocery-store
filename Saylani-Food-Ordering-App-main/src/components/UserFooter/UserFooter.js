import React from 'react'
import { Link } from 'react-router-dom';

const UserFooter = () => {
    return (
        <footer className="AdminFooter">
            <ul>
            <li>
              <Link to="/home">
                <i className="fa-solid fa-house"></i> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link to="/acount">
                <i className="fa-solid fa-user"></i> <span>Account</span>
              </Link>
            </li> 
          </ul>
        </footer>
      );
}

export default UserFooter