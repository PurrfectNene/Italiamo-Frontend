import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  console.log(email, password);
  const navigate = useNavigate()

  const handleSignupSubmit= (e)=>{

    e.preventDefault()

    let newUser={
      email:email,
      password:password
    }

    axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,newUser)
    .then((createdUser)=>{
      navigate('/login')
      console.log(createdUser);
    })
    .catch((err)=>{
      console.log(err.res.data.message);
      setErrorMessage(err.res.data.message)
    })
  }

  return (
    <div>
    <form onSubmit={handleSignupSubmit}>
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
      <button type="submit">Sign Up</button>
    </form>

    {errorMessage && <p>ERROR: {errorMessage}</p>}
    <p>*Password must contain at least one upper case letter, one lower case letter, one digit, one special character or space, and be a minimum of eight characters in length.</p>
    <p>Already have an account?</p>
    <Link to={"/login"}>Login</Link>
    </div>
  );
}

