import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
        <li>
          <Link to="/financials">Financials</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
