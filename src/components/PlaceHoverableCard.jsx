import { Link } from "react-router-dom";

export default function PlaceHoverableCard({ link, data, onClick }) {
  const Wrapper = ({ children }) => {
    if (link) {
      return (
        <Link onClick={onClick} to={link}>
          {children}
        </Link>
      );
    }
    return (
      <a onClick={onClick} to={link}>
        {children}
      </a>
    );
  };

  return (
    <Wrapper>
      <img
        src={data.imageUrl}
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
