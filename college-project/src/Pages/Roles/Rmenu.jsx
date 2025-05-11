import "../Homestyle.css";
import styles from "./rolestyles.module.css";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import image from "../../assets/img1.jpeg";
import { useState } from "react";

const Rmenu = ({ handleLogoutt, userRole }) => {
  const [showDialog, setShowDialog] = useState(false); // State to toggle dialog visibility
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
          <a>Home</a>
          <a>Events</a>
          <a>Upcoming</a>
          <a>Gallery</a>

          {userRole === "admin" && (
            <a href="/upload" onClick={() => setIsDrawerOpen(false)}>
              Upload
            </a>
          )}
        </nav>

        {/* Profile Picture */}
        <img
          src={image}
          id={styles.pro_img}
          onClick={toggleDialog} // Toggle dialog on click
          alt="Profile"
        />

        {/* Dialog/Menu */}
        {showDialog && <Pro_dialog handleLogoutt={handleLogoutt} />}
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
            <a onClick={() => setIsDrawerOpen(false)}>Gallery</a>
            {/* Conditionally Render Upload Option for Admin Users */}
            {userRole === "admin" && (
              <a
                href="/upload"
                onClick={() => setIsDrawerOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                Upload
              </a>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

const Pro_dialog = ({ handleLogoutt }) => {
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
        onClick={handleLogoutt} // Call handleLogoutt on click
      >
        Logout
      </p>
    </div>
  );
};

export default Rmenu;
