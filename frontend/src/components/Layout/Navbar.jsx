import React from "react";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import styles from "./../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[black]" : "text-[#ffff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
