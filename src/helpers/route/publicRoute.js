import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  //restricted true jika sudah login tidak bisa ke halaman sign in
  // res false = yang benar benar public
  if (token && props.restricted) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  //   if (props.isAdmin && dataUser?.role !== "admin") {
  //     return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  //   }
  return <Outlet />;
}
