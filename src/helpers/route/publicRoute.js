import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  if (token && props.restricted) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
