import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Footer.css";

function Footer() {
  const { pathname } = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  if (pathname === "/dashboard") {
    return null;
  }
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <div className="footer">
      {isLoggedIn ? (
        <>
          <Link to="/profile">
            <h5 id="profile">Profile</h5>
          </Link>

          <Link
            onClick={() => {
              logOutUser();
            }}
          >
            <h5 id="logout">Logout</h5>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <h5 id="login">Login</h5>
          </Link>

          <Link to="/register">
            <h5 id="signup">Sign Up</h5>
          </Link>
        </>
      )}
      <div className="login-signup-footer">
        <div>
          <h5>Follow us:</h5>
        </div>

        <div>
          <Space>
            <TwitterSquareFilled />
            <FacebookFilled />
            <InstagramFilled />
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Footer;
