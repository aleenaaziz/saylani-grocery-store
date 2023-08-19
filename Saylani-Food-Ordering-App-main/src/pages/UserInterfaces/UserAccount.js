import React, { useEffect } from "react";
import UserFooter from "../../components/UserFooter/UserFooter";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../app/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assests/img/man.png";
import ProductImage from "../../assests/img/Grocery.png";

const UserAccount = () => {
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.uid === "zl9VwcQK3gbNGMDXZrSHjJ4fL042"){
          navigate("/admin/acount");
        }
        navigate("/acount");
      }else{
        navigate("/");
      }
    });
  }, []);
  return (
    <main className="userAccountPage">
      <div className="over">
        <div className="container">
          <div className="head">
            <h1>Setting</h1>
            <img src={Logo} alt="Logo" />
          </div>
          <div className="body">
            <div className="updateText">
              <input type="text" placeholder="Update Full Name" />
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>

        <div className="container_">
          <h3>Orders</h3>

          <div className="overr">
            <ul className="productsList">
              <li >
                <Link to="/acount">
                  <img src={ProductImage} alt="ProductImage" />
                  <span>Data</span>
                </Link>
              </li>
              <li >
                <Link to="/acount">
                  <img src={ProductImage} alt="ProductImage" />
                  <span>Data</span>
                </Link>
              </li>
              <li >
                <Link to="/acount">
                  <img src={ProductImage} alt="ProductImage" />
                  <span>Data</span>
                </Link>
              </li>
              <li >
                <Link to="/acount">
                  <img src={ProductImage} alt="ProductImage" />
                  <span>Data</span>
                </Link>
              </li>
              {/* {categoryData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to="/admin/acount">
                      <img src={item.itemPicUrl} alt="ProductImage" />
                      <span>{item.categoryName}</span>
                    </Link>
                  </li>
                );
              })} */}
            </ul>
          </div>

          <button type="button" className="btn"  onClick={onLogoutHandler}>
            Log Out
          </button>
        </div>
      </div>
      <UserFooter />
    </main>
  );
};

export default UserAccount;
