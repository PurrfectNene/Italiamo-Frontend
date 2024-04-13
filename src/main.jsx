import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#927766",
              activeBorderColor: "#927766",
              activeShadow: "0 0 0 2px rgb(151, 87, 47, 0.2)",
              colorBgContainer: "#ffffff00",
              colorBorder: "#a5a5a5",
              colorText: "#766f6b",
            },
          },
        }}
      >
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </AuthProviderWrapper>
  </React.StrictMode>
);
