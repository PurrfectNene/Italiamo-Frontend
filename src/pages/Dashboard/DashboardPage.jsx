import { GlobalOutlined } from "@ant-design/icons";
import { Col, Flex, Menu, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import CitiesPage from "./pages/CitiesPage";
import PlacesPage from "./pages/PlacesPage";
import RegionsPage from "./pages/RegionsPage";

const { Text, Title, Paragraph } = Typography;

const items = [
  {
    key: "regions",
    label: "Regions",
    icon: <GlobalOutlined />,
  },
  {
    key: "cities",
    label: "Cities",
    icon: <GlobalOutlined />,
  },
  {
    key: "places",
    label: "Places",
    icon: <GlobalOutlined />,
  },
];

export default function DashboardPage() {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const selectedPage = urlSearchParams.get("page") || "regions";

  function renderDashboardPage() {
    switch (selectedPage) {
      case "regions":
        return <RegionsPage />;
      case "places":
        return <PlacesPage />;
      case "cities":
        return <CitiesPage />;
      default:
        return <RegionsPage />;
    }
  }

  const onClick = (e) => {
    setUrlSearchParams(() => ({ page: e.key }));
  };

  return (
    <Flex style={{ minHeight: "100svh", background: "#f4f4f4" }}>
      <Col
        style={{
          background: "white",
          width: 300,
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          padding: "0 0 1.5rem",
          height: "100svh",
          position: "sticky",
          top: 0,
        }}
      >
        <Flex justify="center" align="center" style={{ padding: "0.5rem" }}>
          <Text
            style={{
              marginTop: 0,
              marginLeft: "0.5rem",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            Italiamo Dashboard
          </Text>
        </Flex>
        <Menu
          selectedKeys={[selectedPage]}
          onClick={onClick}
          style={{ width: "100%", borderRight: 0 }}
          mode="vertical"
          items={items}
        />
      </Col>
      <Col style={{ flex: 1, padding: "1.5rem" }}>{renderDashboardPage()}</Col>
    </Flex>
  );
}
