import React, { useEffect, useState } from "react";
import AdminHead from "../../components/AdminHead/AdminHead";
import AdminFooter from "../../components/AdminFooter/AdminFooter";
import { auth, database } from "../../app/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const AdminHome = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    const starCountRef = ref(database, "products/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
        setProductsData(Object.values(data));
      }else{
        setProductsData([]);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "zl9VwcQK3gbNGMDXZrSHjJ4fL042") {
        navigate("/admin/home");
      }else{
        navigate("/home");
      }
    });
  }, []);
  console.log(productsData);
  return (
    <main className="adminHomePage">
      <div className="container border">
        <AdminHead />
      </div>
      <div className="over">
        <div className="container">
          <div className="body">
            <h3>Products</h3>

            <ul className="productsList">
              {productsData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to="/admin/home">
                      <img src={item.itemPicUrl} alt="ProductImage" />
                      <div className="text">
                        <h4>{item.itemName}</h4>
                        <p>{item.unitName}</p>
                      </div>
                      <span>Rs {item.unitPrice} </span>
                    </Link>
                  </li>
                );
              })}

              {/* <li>
                <Link to="/admin/home">
                  <img src={productImage} alt="ProductImage" />
                  <div className="text">
                    <h4>Apple</h4>
                    <p>1 Kg</p>
                  </div>
                  <span>$2.1 </span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <AdminFooter />
    </main>
  );
};

export default AdminHome;
