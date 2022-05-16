import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  console.log(user);
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (props.isAdmin && dataUser.role !== "admin") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
