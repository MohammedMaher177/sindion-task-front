import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute(props) {
  const { token } = useSelector(({ auth }) => auth);
  if (token == null) {
    return <Navigate to={"/signin"} />;
  } else {
    return props.children;
  }
}
