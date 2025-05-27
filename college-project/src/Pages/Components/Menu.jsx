import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../Homestyle.css";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Menu = () => {
  const nav = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function signup_page() {
    nav("/signup");
    setIsDrawerOpen(false); // close drawer after nav
  }

  function login_page() {
    nav("/login");
    setIsDrawerOpen(false); // close drawer after nav
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <div className="menu_cont">
        <p className="title">Campus Events</p>
        <nav className="links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/eventpage" className="nav-link">
            Events
          </NavLink>
          <NavLink to="/upcoming" className="nav-link">
            Upcoming
          </NavLink>
          <NavLink to="/gallery" className="nav-link">
            Gallery
          </NavLink>
        </nav>

        <div className="btns">
          <button onClick={signup_page}>Signup</button>
          <button onClick={login_page}>Login</button>
        </div>
        <IoMenu className="menu_icon" size={24} onClick={toggleDrawer} />
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="drawer">
          <div className="drawer_header">
            <p>Menu</p>
            <IoClose size={24} onClick={toggleDrawer} className="menu_icon" />
          </div>
          <nav className="drawer_links">
            <a onClick={() => setIsDrawerOpen(false)} href="/">
              Home
            </a>
            <a onClick={() => setIsDrawerOpen(false)} href="/eventpage">
              Events
            </a>
            <a onClick={() => setIsDrawerOpen(false)} href="/upcoming">
              Upcoming
            </a>
            <a onClick={() => setIsDrawerOpen(false)} href="/gallery">
              Gallery
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
