//What the logged users see

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading) return <Loading />;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
    //we need to wrap the page we want to show to the logged user
  }
}
 
export default IsPrivate;