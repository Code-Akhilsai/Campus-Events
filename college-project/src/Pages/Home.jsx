import Menu from "./Components/Menu";
import Intro from "./Components/Intro";
import Events from "./Components/Events";
import Footer from "./Components/Footer";
import "./Homestyle.css";
import Featured from "./Components/Featured";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebaseConfig"; // Import Firebase Auth instance

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/dashboard", { replace: true }); // Redirect logged-in users to the dashboard
    }
  }, [navigate]);
  return (
    <>
      <Menu />
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
