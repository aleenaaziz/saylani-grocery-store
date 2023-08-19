import React, { useEffect } from "react";
import UserFooter from "../../components/UserFooter/UserFooter";
import imageee from "../../assests/img/Grocery.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../app/Firebase";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/cart");
      }else{
        navigate("/");
      }
    });
  }, []);
  return (
    <main className="cartPage">
      <div className="over">
        <div className="container border">
          <div className="head">
            <div>
              <h6>Shopping</h6>
              <h4>Cart</h4>
            </div>
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="body">
            <ul>
              <li>
                <div className="text">
                  <img src={imageee} alt="cart Item Image" />
                  <p>Item Name</p>
                  <div className="text_">
                    <span>-</span>
                    <input type="text" />
                    <span>+</span>
                  </div>
                </div>
                <div className="price">RS 200</div>
              </li>
              <li>
                <div className="text">
                  <img src={imageee} alt="cart Item Image" />
                  <p>Item Name</p>
                  <div className="text_">
                    <span>-</span>
                    <input type="text" />
                    <span>+</span>
                  </div>
                </div>
                <div className="price">RS 200</div>
              </li>
              <li>
                <div className="text">
                  <img src={imageee} alt="cart Item Image" />
                  <p>Item Name</p>
                  <div className="text_">
                    <span>-</span>
                    <input type="text" />
                    <span>+</span>
                  </div>
                </div>
                <div className="price">RS 200</div>
              </li>
              <li>
                <div className="text">
                  <img src={imageee} alt="cart Item Image" />
                  <p>Item Name</p>
                  <div className="text_">
                    <span>-</span>
                    <input type="text" />
                    <span>+</span>
                  </div>
                </div>
                <div className="price">RS 200</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="container ">
          <div className="totalPrice">
            <h5>Total</h5>
            <p>Rs 1000</p>
          </div>
        </div>
        <div className="container ">
          <div className="formm">
            <form>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone Number" />
                <textarea placeholder="Shipping Address"></textarea>
                <button type="submit" className="btn"> Place Order</button>
            </form>
          </div>
        </div>
      </div>
      <UserFooter />
    </main>
  );
};

export default Cart;
