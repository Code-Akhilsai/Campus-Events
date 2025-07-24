import { FaRegCopyright } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <footer className="footer_cont">
        <p className="footer_title">Campus Events</p>
        <div>
          <FaRegCopyright />
          <p>2025 Campus Events.</p>
          <p>All rights reserved</p>
        </div>
        <div>
          <p>About</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
        </div>
        <br />
        
        <p style={{ color: "white" }}>Developed by Akhil Sai</p>
      </footer>
    </>
  );
};
export default Footer;
