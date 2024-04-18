import { Flex, Space } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  const items = [
    {
      key: 0,
      label: <Link to={"/login"}>Login</Link>,
    },
    {
      key: 1,
      label: <Link to={"/register"}>Register</Link>,
    },
  ];

  return (
    <Flex
      component="nav"
      style={{
        minHeight: 60,
        backgroundColor: "white",
        boxShadow: "0 2px 4px -1px rgba(57,76,96,.15)",
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
          color: "#5f4e44",
        }}
      >
        ITALIAMO
      </Link>
      <Space
        style={{
          fontSize: "1.1rem",
          marginRight: "auto",
          marginLeft: "3rem",
        }}
        size={"large"}
      >
        <Link className="menu-link" to="/login">
          Login
        </Link>
        <Link className="menu-link" to="/register">
          Create account
        </Link>
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
              color: "#5f4e44",
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
                color: "#5f4e44",
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
