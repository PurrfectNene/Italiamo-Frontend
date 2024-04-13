import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";

const { Text, Title } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();

  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <Flex
      component="main"
      vertical
      style={{ minHeight: "calc(100svh - 60px)" }}
    >
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
              // backgroundColor: "white",
              // padding: "2rem",
              borderRadius: "0.3rem",
              position: "relative",
            }}
          >
            {/* <Flex
              style={{
                backgroundColor: "white",
                position: "absolute",
                top: "-3.75rem",
                height: "7.5rem",
                width: "7.5rem",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Flex
                style={{
                  backgroundColor: "#927766",
                  height: "6.875rem",
                  width: "6.875rem",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "4rem",
                  color: "white",
                }}
              >
                <UserOutlined />
              </Flex>
            </Flex> */}
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
