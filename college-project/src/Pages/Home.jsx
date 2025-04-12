import Menu from "./Components/Menu";
import Intro from "./Components/Intro";
import Events from "./Components/Events";
import Footer from "./Components/Footer";
import "./Homestyle.css";
import Featured from "./Components/Featured";

function Home() {
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
