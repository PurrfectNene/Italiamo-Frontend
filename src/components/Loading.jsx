import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{
        height: "calc(100svh - 60px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
}
