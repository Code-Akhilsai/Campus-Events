import Menu from "./Components/Menu";
import Intro from "./Components/Intro";
import Events from "./Components/Events";
import Footer from "./Components/Footer";
import "./Homestyle.css";
import Featured from "./Components/Featured";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <Intro />
      <br />
      <br />
      <Featured />
      <br />
      <Events />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Home;
