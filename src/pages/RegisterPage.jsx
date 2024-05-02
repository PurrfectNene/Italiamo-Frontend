import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [serverError, setServerErrorMessage] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(values) {
    const { email, password } = values;

    const newUser = {
      email,
      password,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, newUser)
      .then((createdUser) => {
        navigate("/login");
        console.log(createdUser);
      })
      .catch((err) => {
        console.log(err.res.data.message);
        setServerErrorMessage(err.res.data.message);
      });
  }

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
          // className="background-pattern"
          xs={24}
          lg={12}
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
            <Title
              level={1}
              style={{
                textAlign: "center",
                color: "#927766",
                fontSize: "2.75rem",
                fontWeight: "bolder",
                marginBottom: 0,
              }}
            >
              Welcome to Italiamo!
            </Title>
            <Text
              style={{
                marginBottom: "1.5rem",
                marginTop: "0.15rem",
                color: "#6e6e6e",
              }}
            >
              Create a new account
            </Text>
            <Form
              id="register"
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
                style={{ marginBottom: "1rem", backgroundColor: "#efe9db" }}
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
                <Input autoComplete="email" size="large" placeholder="Email" />
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
                  autoComplete="new-password"
                  size="large"
                  placeholder="Password"
                  style={{ backgroundColor: "#efe9db" }}
                />
              </Form.Item>
              <Form.Item
                name="confirm-password"
                label=""
                style={{ marginBottom: "1rem" }}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => {
                    return {
                      validator: async (_, value) => {
                        if (value != getFieldValue("password"))
                          return Promise.reject();
                        return Promise.resolve();
                      },
                      message: "The passwords do not match.",
                    };
                  },
                ]}
              >
                <Input.Password
                  className="custom-placeholder"
                  autoComplete="new-password"
                  size="large"
                  placeholder="Confirm Password"
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
              form="register"
            >
              REGISTER
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
