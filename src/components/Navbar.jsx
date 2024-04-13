import { Flex } from "antd";

export default function Navbar() {
  return (
    <Flex
      component="nav"
      style={{
        minHeight: 60,
        backgroundColor: "white",
        boxShadow: "0 2px 4px -1px rgba(57,76,96,.15)",

        zIndex: 100,
        position: "relative",
      }}
    >
      Item 1
    </Flex>
  );
}
