import { useState } from "react";
import { LOGO_URL } from "../../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus.js";
const Heading = () => {
  let [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-blue-100 shadow-lg">
      <div className="w-20 p-4 m-5">
        <img src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul className="flex p-5 m-4">
          <li className="p-2">Online status:{onlineStatus ? "✅" : "🔴"}</li>
          <li className="p-2">
            <Link to="/home">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-2">
            <Link to="/contact">Contant Us</Link>
          </li>
          <li className="p-2">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="p-2">
            <Link to="/grocery">Grocery</Link>
          </li>
          <button
            className="login"
            onClick={() => {
              setBtnName("Logout");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Heading;
