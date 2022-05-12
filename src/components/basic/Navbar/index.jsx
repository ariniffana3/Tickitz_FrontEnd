import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  //   [1]
  // const handleNavigateHome = () => {
  //     navigate("/");
  // }
  // const handleNavigateListMovie = () => {
  //     navigate("/list-movie");
  // }
  //   [2]
  const handleNavigate = (nav) => {
    navigate(`/${nav}`);
  };
  return (
    <>
      <Link to="/basic/counter">Counter App</Link> | <Link to="/basic/react">Basic React</Link> | |{" "}
      <button onClick={() => handleNavigate("")}>Home</button> |{" "}
      <button onClick={() => handleNavigate("list-movie")}>List Movie</button> |
      <button onClick={handleLogout}>Logout</button> |{" "}
      <button onClick={() => handleNavigate("login")}>Logout</button>
    </>
  );
}

export default Navbar;
