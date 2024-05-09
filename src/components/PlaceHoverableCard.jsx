import { Link } from "react-router-dom";

export default function PlaceHoverableCard({ link, data, onClick }) {
  const Wrapper = ({ children }) => {
    if (link) {
      return (
        <Link onClick={onClick} to={link} style={{ height: "fit-content" }}>
          {children}
        </Link>
      );
    }
    return (
      <a onClick={onClick} to={link} style={{ height: "fit-content" }}>
        {children}
      </a>
    );
  };

  return (
    <Wrapper>
      <img
        src={data.imageUrl.replace("upload/", "upload/c_scale,w_350/")}
        style={{
          background: "grey",
          width: 160,
          height: 120,
          borderRadius: "1rem",
          objectFit: "cover",
        }}
      />
    </Wrapper>
  );
}
