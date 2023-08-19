import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../app/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userPassword: "",
  });

  const onClickHandler = (e) => {
    e.preventDefault();
    const { userName, userEmail, userPassword, userContact } = userData;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(database, "users/" + user.uid), {
          username: userName,
          email: userEmail,
          number: userContact,
          userId: user.uid
        })
          .then(() => {
            navigate('/signin')
            console.log("dataSave");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <main className="authPage">
      <div className="container">
        <h2 className="first">SAYLANI WELFARE</h2>
        <h4 className="second">ONLINE DISCOUNT STORE</h4>
        <form>
          <div>
            <input
              type="text"
              placeholder="FullName"
              name="userName"
              value={userData.userName}
              onChange={onChangeHandler}
            />
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact"
              name="userContact"
              value={userData.userContact}
              onChange={onChangeHandler}
            />
            <i className="fa-solid fa-phone-volume"></i>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="userEmail"
              value={userData.userEmail}
              onChange={onChangeHandler}
            />
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div>
            <input
              type={show ? "text" : "password"}
              name="userPassword"
              placeholder="Password"
              value={userData.userPassword}
              onChange={onChangeHandler}
            />
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => setShow(!show)}
            ></i>
          </div>
        </form>

        <div className="text">
          <button className="btn" type="button" onClick={onClickHandler}>
            Sign Up
          </button>
          <Link to="/signin" className="bottom">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
