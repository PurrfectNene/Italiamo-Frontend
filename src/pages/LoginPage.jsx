import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../context/auth.context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // const {authenticateUser} = useContext(AuthContext)

  console.log(email, password);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let body = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, body)
      .then(() => {
        // localStorage.setItem('authToken',response.data.authToken)
        // authenticateUser()

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/register"}> Sign Up</Link>
    </div>
  );
}

