//What only admin users can see

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Loading from "./Loading";

function IsAdmin(props) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  if (isLoading) return <Loading />;

  if (!isLoggedIn || !user.isAdmin) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}

export default IsAdmin;
