import { Button, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useState } from "react";

const { Text, Title } = Typography;

const NewsletterBanner = () => {
  const [form] = Form.useForm();
  const [serverError, setServerErrorMessage] = useState(null);

  const handleSubmit = (values) => {
    const { email } = values;

    // Handle form submission (e.g., sending email to server)
    console.log("Submitting email:", email);
  };

  return (
    <Row gutter={[16, 16]} justify="center" style={{ marginTop: "2rem" }}>
      <Col xs={24} md={12}>
        <div style={{ maxWidth: "100%", height: "auto", maxHeight: "300px", overflow: "hidden", borderRadius: "0.5rem" }}>
          <img
            src="https://img.money.com/2023/09/Travel-Guide-Italy.jpg?quality=85" 
            style={{width: "60%", height: "auto", objectFit: "cover" }}
          />
        </div>
      </Col>
      <Col xs={24} md={12}>
        <Title level={2}>Subscribe to Our Newsletter</Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          style={{ maxWidth: "300px" }}
        >
          {serverError && <Text type="danger">{serverError}</Text>}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input size="large" placeholder="Your Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default NewsletterBanner;

