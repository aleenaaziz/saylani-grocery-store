import React from "react";
import { Link } from "react-router-dom";
import "./AdminFooter.css";

const AdminFooter = () => {
  return (
    <footer className="AdminFooter">
        <ul>
        <li>
          <Link to="/admin/home">
            <i className="fa-solid fa-house"></i> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/addProduct">
            <i className="fa-solid fa-circle-plus"></i>
            <span>Add Itmes</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/acount">
            <i className="fa-solid fa-user"></i> <span>Account</span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default AdminFooter;
