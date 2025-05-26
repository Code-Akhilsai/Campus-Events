import "../Homestyle.css";
import styles from "./rolestyles.module.css";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import image from "../../assets/image.jpg";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Rmenu = ({ handleLogoutt, userRole }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDialog = () => {
    setShowDialog((prev) => !prev); // Toggle the dialog visibility
  };
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

        {/* Profile Picture */}
        <img
          src={image}
          id={styles.pro_img}
          onClick={toggleDialog}
          alt="Profile"
        />

        {/* Dialog/Menu */}
        {showDialog && (
          <Pro_dialog handleLogoutt={handleLogoutt} userRole={userRole} />
        )}
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
          <button onClick={handleLogoutt} href="/" className="logout_btn">
            Logout
          </button>
        </div>
      )}
    </>
  );
};

const Pro_dialog = ({ handleLogoutt, userRole }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "12px",
        zIndex: 1000,
        width: "100px",
      }}
    >
      <p
        style={{
          margin: "0",
          padding: "5px 0",
          cursor: "pointer",
          fontSize: "17px",
          fontFamily: "sans-serif",
        }}
        onClick={() => navigate("/profile")}
      >
        Profile
      </p>
      <p
        style={{
          margin: "0",
          padding: "7px 0",
          cursor: "pointer",
          fontSize: "17px",
          fontFamily: "sans-serif",
        }}
      >
        Notifications
      </p>

      <p
        style={{
          margin: "0",
          padding: "7px 0",
          cursor: "pointer",
          fontSize: "17px",
          fontFamily: "sans-serif",
        }}
      >
        Settings
      </p>
      <p
        style={{
          margin: "0",
          padding: "7px 0",
          cursor: "pointer",
          fontSize: "17px",
          fontFamily: "sans-serif",
        }}
        onClick={handleLogoutt}
      >
        Logout
      </p>
    </div>
  );
};

export default Rmenu;
