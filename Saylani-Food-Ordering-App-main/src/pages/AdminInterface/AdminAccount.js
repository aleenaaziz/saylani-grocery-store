import React, { useEffect, useState } from "react";
import AdminFooter from "../../components/AdminFooter/AdminFooter";
import Logo from "../../assests/img/man.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../../app/Firebase";
import { onValue, ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AdminAccount = () => {
  const navigate = useNavigate()
  const nanoId = nanoid();
  const [categoryData, setCategoryData] = useState([]);
  const [accountData, setAccountData] = useState({
    categoryName: "",
    itemPicUrl: "",
  });

  const fileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.size <= 1000000) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setAccountData({
          ...accountData,
          itemPicUrl: e.target.result,
        });
      };
    } else {
      alert("file size to large");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };
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
  const onClickHandler = (e) => {
    e.preventDefault();
    console.log(accountData);
    set(ref(database, "category/" + nanoId), accountData);
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "zl9VwcQK3gbNGMDXZrSHjJ4fL042") {
        navigate("/admin/acount");
      }else{
        navigate("/home");
      }
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(database, "category/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategoryData(Object.values(data));
      } else {
        setCategoryData([]);
      }
    });
  }, []);

  return (
    <main className="adminAccountPage">
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
            <div className="updateImage">
              <input type="file" id="imgg" hidden onChange={fileUpload} />
              <label htmlFor="imgg" className="imagee">
                <i className="fa-solid fa-camera"></i>
              </label>
            </div>
            <div className="addCat">
              <input
                type="text"
                placeholder="New Category name"
                name="categoryName"
                value={accountData.categoryName}
                onChange={onChangeHandler}
              />
              <button type="button" className="btnn" onClick={onClickHandler}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="container_">
          <h3>All Categories</h3>

          <div className="overr">
            <ul className="productsList">
              {categoryData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to="/admin/acount">
                      <img src={item.itemPicUrl} alt="ProductImage" />
                      <span>{item.categoryName}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <button type="button" className="btn" onClick={onLogoutHandler}>
            Log Out
          </button>
        </div>
      </div>

      <AdminFooter />
    </main>
  );
};

export default AdminAccount;