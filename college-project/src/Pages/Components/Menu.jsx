import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <a>Home</a>
          <a>Events</a>
          <a>Upcoming</a>
          <a>Organizations</a>
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
            <IoClose size={24} onClick={toggleDrawer} />
          </div>
          <nav className="drawer_links">
            <a onClick={() => setIsDrawerOpen(false)}>Home</a>
            <a onClick={() => setIsDrawerOpen(false)}>Events</a>
            <a onClick={() => setIsDrawerOpen(false)}>Upcoming</a>
            <a onClick={() => setIsDrawerOpen(false)}>Organizations</a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
