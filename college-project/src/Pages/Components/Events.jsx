import Image1 from "../../assets/img1.jpeg";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
const Events = () => {
  const event_data = [
    {
      Image: Image1,
      Title: "Spring Music Festival",
      Descripton:
        "Annual music festival featuring student bands and performers.",
      Date: "Tue, Apr 15",
      Time: "6:00 PM",
      Venue: "Main Quad",
    },

    {
      Image: Image1,
      Title: "Career Fair",
      Descripton:
        "Connect with employers from various industries for internships and job opportunities.",
      Date: "Fri, Mar 28",
      Time: "10:00 AM",
      Venue: "Student Union Ballroom",
    },

    {
      Image: Image1,
      Title: "Career Fair",
      Descripton:
        "Connect with employers from various industries for internships and job opportunities.",
      Date: "Fri, Mar 28",
      Time: "10:00 AM",
      Venue: "Student Union Ballroom",
    },
  ];
  return (
    <>
      {" "}
      <p className="eventcont_title" id="event_container">
        Events
      </p>
      <section className="event_container">
        <br />
        {event_data.map((data, index) => {
          const { Image, Title, Descripton, Date, Time, Venue } = data;
          return (
            <div key={index} className="event_cont">
              <img src={Image} />
              <p className="event_title">{Title}</p>
              <p className="event_des">{Descripton}</p>
              <div className="icons2">
                <div className="icon_text2">
                  <MdOutlineCalendarMonth size={22} />
                  <p>{Date}</p>
                </div>
                <div className="icon_text2">
                  <IoTimeOutline size={23} />
                  <p>{Time}</p>
                </div>

                <div className="icon_text2">
                  <IoLocationOutline size={23} />
                  <p>{Venue}</p>
                </div>
                <button className="eventv_btn">View Details</button>
              </div>
            </div>
          );
        })}
      </section>
      <button className="eventv_btn2">View All Events</button>
      <br />
      <br />
    </>
  );
};

export default Events;
