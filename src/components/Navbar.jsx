import { Flex, Space } from "antd";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const { pathname } = useLocation();

  if (pathname === "/dashboard") {
    return null;
  }
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <Flex
      component="nav"
      style={{
        minHeight: 60,
        backgroundColor: "white",
        // boxShadow: "0 2px 4px -1px rgba(57,76,96,.15)",
        zIndex: 100,
        position: "relative",
        alignItems: "center",
        display: "flex",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      <Space
        style={{
          fontSize: "1.1rem",
          marginLeft: "auto",
          marginRight: "3rem",
        }}
        size={"large"}
      >
        <Link className="menu-link" to="/regions">
          Where to go
        </Link>
        <Link className="menu-link" to="/cities">
          What to do
        </Link>
      </Space>
      <Link
        to="/"
        className="roboto-slab"
        style={{
          fontSize: "2rem",
          color: "black",
        }}
      >
        <img
          src="/italiamo-black.png"
          alt="Logo Italiamo"
          width="50"
          height="auto"
        />
      </Link>
      <Space
        style={{
          fontSize: "1.1rem",
          marginRight: "auto",
          marginLeft: "3rem",
        }}
        size={"large"}
      >
        {isLoggedIn ? (
          <>
            <Link className="menu-link" to="/profile">
              Profile
            </Link>
            <Link
              className="menu-link"
              onClick={() => {
                logOutUser();
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="menu-link" to="/login">
              Login
            </Link>
            <Link className="menu-link" to="/register">
              Create account
            </Link>
          </>
        )}
      </Space>
      {/* {isLoggedIn ? (
        <></>
      ) : (
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 0,
          }}
        >
          <Button
            type="text"
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "0.75rem",
              fontSize: "1.25rem",
              color: "black",
              padding: "0.5rem",
              height: "auto",
            }}
          >
            <SearchOutlined />
          </Button>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
            trigger="click"
          >
            <Button
              type="text"
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "0.75rem",
                fontSize: "1.25rem",
                color: "black",
                padding: "0.5rem",
                height: "auto",
              }}
            >
              <UserOutlined />
            </Button>
          </Dropdown>
        </div>
      )} */}
    </Flex>
  );
}
