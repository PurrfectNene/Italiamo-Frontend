import { Link } from "react-router-dom";

export default function PlaceCard({ name, imageSrc }) {
  return (
    <Link
      //   to={"/places/:id"}
      className="place-card hover-underline"
      style={{
        display: "flex",
        flexDirection: "column",
        textDecorationColor: "black",
      }}
    >
      <img
        width={"100%"}
        height={200}
        style={{ backgroundColor: "grey", objectFit: "cover" }}
        src={imageSrc}
      />
      <h1
        style={{
          fontSize: "1.1rem",
          color: "black",
          margin: 0,
          marginTop: "0.25rem   ",
        }}
      >
        {name}
      </h1>
    </Link>
  );
}
