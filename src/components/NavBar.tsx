import { FC } from "react";
import "../styles/Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar: FC = () => {
  return (
    <nav className="nav_container">
      <h1 id="logo">IndiGG</h1>
      <div className="menu_icon">
        <GiHamburgerMenu size={38} />
      </div>
    </nav>
  );
};
export default Navbar;
