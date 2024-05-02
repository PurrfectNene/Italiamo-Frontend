import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <div className="footer">
      <Link to="/login">
        <h5 id="login">Login</h5>
      </Link>

      <Link to="/register">
        <h5 id="signup">Sign Up</h5>
      </Link>

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
