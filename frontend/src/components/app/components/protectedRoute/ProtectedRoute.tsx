import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../../../common/types/types";
import Loader from "../../../loader/Loader";

interface ProtectedRouteProps {
  element: React.ReactElement;
  user: User | null;
  authChecked: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  user,
  authChecked,
}) => {
    console.log(user)
  if (!authChecked) {
    return <Loader />;
  }
  return user ? element : <Navigate to="/sign-in" />;
};
export default ProtectedRoute;
