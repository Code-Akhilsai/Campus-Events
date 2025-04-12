import { useNavigate } from "react-router-dom";
import "../Homestyle.css";
import { IoMenu } from "react-icons/io5";

const Menu = () => {
  const nav = useNavigate();

  function signup_page() {
    nav("/signup");
  }

  function login_page() {
    nav("/login");
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
        <IoMenu className="menu_icon" size={24} />
      </div>
    </>
  );
};

export default Menu;
