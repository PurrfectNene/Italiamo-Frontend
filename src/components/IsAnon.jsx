//What the no logged users see

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
 
export default IsAnon;