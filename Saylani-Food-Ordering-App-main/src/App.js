import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/CommonScreen/Home";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import AdminHome from "./pages/AdminInterface/AdminHome";
import AdminAddItem from "./pages/AdminInterface/AdminAddItem";
import AdminAccount from "./pages/AdminInterface/AdminAccount";
import UserHome from "./pages/UserInterfaces/UserHome";
import Cart from "./pages/UserInterfaces/Cart";
import UserAccount from "./pages/UserInterfaces/UserAccount";

function App() {
  return (
    <div>
      <Routes>
        {/* Common */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* User */}
        <Route path="/home" element={<UserHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/acount" element={<UserAccount />} />
        {/* Admin */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/addProduct" element={<AdminAddItem />} />
        <Route path="/admin/acount" element={<AdminAccount />} />
      </Routes>
    </div>
  );
}

export default App;
