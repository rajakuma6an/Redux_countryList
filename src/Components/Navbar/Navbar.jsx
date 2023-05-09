import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import "../style.css";

const Navbar = () => {
  return (
    <nav className={"dark_bg"}>
      <div className=" py-3 d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand">
          Where in the world?
        </Link>

        <button className="btn btn-link">{<FaMoon size={20} />}</button>
      </div>
    </nav>
  );
};

export default Navbar;
