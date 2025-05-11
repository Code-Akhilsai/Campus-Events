import Image1 from "../../assets/annual.jpg";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";

const Featured = ({ userRole }) => {
  return (
    <section className="featured_container">
      <p className="featured_title">Featured Event</p>
      <p className="subtitle">Don't miss out on this special event</p>

      <input
        type="text"
        placeholder="Search events.."
        className="featured_input"
      />
      <IoMdSearch className="search_icon" size={19} />
      <br />
      <br />
      <div className="featured_cont2">
        <img src={Image1} />
        <div className="featured_cont3">
          <p className="fevent_title">Annual Spring Concert</p>
          <p className="fevent_des">
            Join us for the biggest musical event of the year featuring our
            university symphony orchestra and choir. This year's theme
            celebrates classical compositions from around the world with special
            guest performances from renowned musicians.
          </p>
          <div className="icons">
            <div className="icon_text">
              <MdOutlineCalendarMonth size={22} />
              <p>Sunday, April 12, 2025</p>
            </div>
            <div className="icon_text">
              <IoTimeOutline size={23} />
              <p>7:00pm</p>
            </div>

            <div className="icon_text">
              <IoLocationOutline size={23} />
              <p>Auditorium</p>
            </div>
            <div className="icon_text">
              <MdPeopleOutline size={23} />
              <p>342 people attending</p>
            </div>

            <button className="fregister_btn">Register Now</button>

            <button className="viewbtn">View Details</button>

            {userRole === "admin" && <button className="viewbtn">Edit</button>}
          </div>
        </div>
      </div>
      <br />
    </section>
  );
};

export default Featured;
