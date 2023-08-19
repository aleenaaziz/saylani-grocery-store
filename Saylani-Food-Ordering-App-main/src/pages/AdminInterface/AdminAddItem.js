import React, { useEffect, useState } from "react";
import AdminHead from "../../components/AdminHead/AdminHead";
import AdminFooter from "../../components/AdminFooter/AdminFooter";
import { onValue, ref, set } from "firebase/database";
import { nanoid } from "nanoid";
import { auth, database } from "../../app/Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const AdminAddItem = () => {
  const [checkSubmitBtn, setCheckSubmitBtn] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: "",
    category: "",
    unitName: "",
    unitPrice: "",
    itemPicUrl: "",
  });
  const navigate = useNavigate();
  const nanoId = nanoid();
  const fileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.size <= 1000000) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setItemData({
          ...itemData,
          itemPicUrl: e.target.result,
        });
      };
    } else {
      alert("file size to large");
    }
  };
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setItemData({
      ...itemData,
      [name]: value,
    });
  };
  const submitData = (e) => {
    e.preventDefault();
    // setCheckSubmitBtn(true);
    console.log(itemData);
    if (itemData.category === "" ) {
      alert("fill Category Field ");
    } else if(itemData.itemPicUrl === ""){
      alert("fill itemPic Field ");
    }
     else {
      set(ref(database, "products/" + nanoId), itemData)
        .then(() => {
          navigate("/admin/home");
          console.log("dataSave");
          setCheckSubmitBtn(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setCheckSubmitBtn(false);
        });
    }
  };

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "zl9VwcQK3gbNGMDXZrSHjJ4fL042") {
        navigate("/admin/addProduct");
      }else{
        navigate("/home");
      }
    });
  }, []);
  return (
    <main className="adminProductPage">
      <div className="container border">
        <AdminHead />
      </div>
      <div className="over">
        <div className="container">
          <div className="body">
            <h3>Add New Item</h3>
            <form onSubmit={submitData}>
              <div className="group">
                <input type="file" id="image" hidden onChange={fileUpload} />
                <label htmlFor="image" className="imagee">
                  {itemData && (
                    <>
                      {itemData.itemPicUrl ? (
                        <>
                          <img
                            src={itemData.itemPicUrl}
                            alt="picss"
                          />
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-camera"></i> Add Items
                        </>
                      )}
                    </>
                  )}
                </label>
              </div>
              <div className="group">
                <input
                  type="text"
                  placeholder="Item Name"
                  required
                  name="itemName"
                  value={itemData.itemName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="group">
                <select
                  name="category"
                  value={itemData.category}
                  onChange={onChangeHandler}
                >
                  <option hidden>Select Category</option>
                  {categoryData.map((item, index) => {
                    return <option key={index}>{item.categoryName}</option>;
                  })}
                  {/* <option>Fruits</option>
                  <option>Vegetables</option> */}
                </select>
              </div>
              <div className="group group_">
                <label>Unit Name:</label>
                <input
                  type="text"
                  placeholder="Pcs / kg / Dozen"
                  required
                  name="unitName"
                  value={itemData.unitName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="group group_">
                <label>Unit Price:</label>
                <input
                  type="text"
                  placeholder="$3.22"
                  name="unitPrice"
                  required
                  value={itemData.unitPrice}
                  onChange={onChangeHandler}
                />
              </div>
              <button className="btn" type="submit" disabled={checkSubmitBtn}>
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <AdminFooter />
    </main>
  );
};

export default AdminAddItem;
