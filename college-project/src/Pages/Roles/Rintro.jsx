import Image1 from "../../assets/img1.jpeg";
import "animate.css";
import "../Homestyle.css";
const Rintro = () => {
  return (
    <>
      <section className="intro_cont">
        <p className="intro_title">Discover EventForge</p>
        <div className="intro_cont2">
          <img
            src={Image1}
            className="animate__animated animate__fadeInRight"
          />

          <div className="intro_cont3">
            <h1 className="intro_title2">
              <p className="animate__animated animate__fadeInLeft">
                Discover Campus Events
              </p>
            </h1>
            <div className="para">
              <p className="animate__animated animate__fadeInLeft">
                {" "}
                Find and join events happening around your campus. Connect with
                peers and make the most of your college experience.
              </p>
            </div>
          </div>
        </div>

        <div className="intro_btns">
          <a href="#event_container">
            {" "}
            <button className="signup_btn">Explore</button>
          </a>
        </div>
      </section>
      <br />
      <br />
      <br />
    </>
  );
};

export default Rintro;
