import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productImage from "../../assests/img/Grocery.png";
import UserFooter from "../../components/UserFooter/UserFooter";
import { auth, database } from "../../app/Firebase";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const UserHome = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProductData(Object.values(data));
      } else {
        setProductData([]);
      }
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(database, "/category");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategoryData(Object.values(data));
      } else {
        setCategoryData([]);
      }
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProductData(Object.values(data));
      } else {
        setProductData([]);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }else{
        navigate("/");
      }
    });
  }, []);
  console.log(categoryData);
  return (
    <main className="userHomePage">
      <div className="container">
        <div className="head">
          <div>
            <h4>Saylani Welfare</h4>
            <h6>DISCOUNT STORE</h6>
          </div>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>

        <div className="body">
          <img src={productImage} alt="banner" className="bann" />
          <div className="searchList">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" />
          </div>
          <div className="categoriesList">
            <h4>Shop By Category</h4>

            <ul>
              {categoryData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link>
                      <img src={item.itemPicUrl} alt="category" />
                      <span> {item.categoryName} </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="overr">
        <div className="container">
          <ul className="productsList">
            {productData.map((item, index) => {
              return (
                <li key={index}>
                  <Link to="/home">
                    <img src={item.itemPicUrl} alt="ProductImage" />
                    <div className="text">
                      <h4>Apple</h4>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugiat, cupiditate.
                      </p>
                    </div>
                    <div className="unitPrice">
                      <span>
                        Rs.{item.unitPrice} - {item.unitName}{" "}
                      </span>
                    </div>
                    <button type="button" className="btn">
                      +
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <UserFooter />
    </main>
  );
};

export default UserHome;
