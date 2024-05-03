import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./LoginPage.css";

const { Text, Title } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [serverError, setServerErrorMessage] = useState(null);
  const { authenticateUser } = useContext(AuthContext);

  function handleSubmit(values) {
    const { email, password } = values;

    let body = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, body)
      .then((response) => {
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser();

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setServerErrorMessage(err.response.data.message);
      });
  }

  const navigate = useNavigate();

  return (
    <Flex component="main" vertical style={{ minHeight: "100svh" }}>
      <Row style={{ flex: 1 }}>
        <Col
          xs={0}
          lg={12}
          style={{
            flex: "1 1 50%",
            backgroundImage: "url(/firenze-toscana.webp)",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></Col>
        <Col
          xs={24}
          lg={12}
          // className="background-pattern"
          style={{
            minHeight: "100%",
            padding: "2rem",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#efe9db",
          }}
        >
          <Flex
            vertical
            justify="center"
            align="center"
            style={{
              borderRadius: "0.3rem",
              position: "relative",
            }}
          >
            <Link
              to="/"
              className="roboto-slab"
              style={{
                fontSize: "2rem",
                filter:
                  "invert(52%) sepia(10%) saturate(955%) hue-rotate(340deg) brightness(91%) contrast(85%)",
              }}
            >
              <img
                src="/italiamo-black.png"
                alt="Logo Italiamo"
                width="100"
                height="auto"
                style={{}}
              />
            </Link>
            <Title
              level={1}
              style={{
                textAlign: "center",
                color: "#927766",
                fontSize: "2.75rem",
                fontWeight: "bolder",
                marginBottom: 0,
                marginTop: 0,
              }}
            >
              Welcome Back!
            </Title>
            <Text
              style={{
                marginBottom: "1.5rem",
                marginTop: "0.15rem",
                color: "#6e6e6e",
              }}
            >
              Login with email
            </Text>
            <Form
              id="login"
              style={{ width: "100%", maxWidth: "320px" }}
              layout="vertical"
              onFinish={handleSubmit}
              form={form}
            >
              {serverError && (
                <Text style={{ color: "red", marginBottom: "1rem" }}>
                  {serverError}
                </Text>
              )}
              <Form.Item
                className="custom-placeholder"
                name="email"
                label=""
                style={{ marginBottom: "1rem" }}
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    validator: async (_, value) => {
                      if (
                        !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)
                      )
                        return Promise.reject();
                      return Promise.resolve();
                    },
                    message: "Invalid email format.",
                  },
                ]}
              >
                <Input
                  autoComplete="email"
                  size="large"
                  // prefix={<UserOutlined />}
                  placeholder="Email"
                  style={{ backgroundColor: "#efe9db" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label=""
                style={{ marginBottom: "1rem" }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  className="custom-placeholder"
                  autoComplete="current-password"
                  size="large"
                  // prefix={<UserOutlined />}
                  placeholder="Password"
                  style={{ backgroundColor: "#efe9db" }}
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              style={{
                backgroundColor: "#927766",
                marginTop: "0.8rem",
                paddingLeft: "1.9rem",
                paddingRight: "1.9rem",
                height: "2.75rem",
                borderRadius: "0.25rem",
              }}
              htmlType="submit"
              size="large"
              form="login"
            >
              LOGIN
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
