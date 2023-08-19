import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../app/Firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = userData;
    //firebase auth
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid);
        if (user.uid === "zl9VwcQK3gbNGMDXZrSHjJ4fL042") {
          console.log("admin");
          navigate("/admin/home");
        } else {
          console.log("user");
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/signin");
      }
    });
  }, []);

  return (
    <main className="authPage">
      <div className="container">
        <h2 className="first">SAYLANI WELFARE</h2>
        <h4 className="second">ONLINE DISCOUNT STORE</h4>

        <form>
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
              placeholder="Password"
              name="userPassword"
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
          <button className="btn" id="signup" onClick={onClickHandler}>
            Sign In
          </button>
          <Link className="bottom" to="/signup">
            Don't have an account?Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
