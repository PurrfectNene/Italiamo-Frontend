import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Typography } from "antd";
import { useState } from "react";

const { Paragraph, Text, Title } = Typography;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email, password);

  return (
    <Flex component="main" vertical style={{ minHeight: "100svh" }}>
      <Row style={{ flex: 1 }}>
        <Col
          xs={0}
          lg={12}
          style={{ backgroundColor: "#97572f", flex: "1 1 50%" }}
        >
          a
        </Col>
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
          }}
        >
          <Title
            level={1}
            style={{
              textAlign: "center",
              color: "#97572f",
              fontSize: "3.4rem",
              fontWeight: "bolder",
              marginBottom: 0,
            }}
          >
            Welcome
          </Title>
          <Text
            style={{
              marginBottom: "1.5rem",
              marginTop: "0.15rem",
              color: "grey",
            }}
          >
            Login with Email
          </Text>
          <Flex
            component="form"
            vertical
            style={{ width: "100%", maxWidth: "320px" }}
          >
            <label htmlFor="email">
              <Text>Email</Text>
            </label>
            <Input
              size="large"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
            />
            <label htmlFor="password" style={{ marginTop: "0.5rem" }}>
              <Text>Password</Text>
            </label>
            <Input
              size="large"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Flex>
          <Button
            type="primary"
            style={{
              backgroundColor: "#97572f",
              marginTop: "2rem",
              paddingLeft: "1.9rem",
              paddingRight: "1.9rem",
              height: "2.75rem",
              borderRadius: "0.25rem",
            }}
            size="large"
          >
            LOGIN
          </Button>
        </Col>
      </Row>
    </Flex>
  );
}
