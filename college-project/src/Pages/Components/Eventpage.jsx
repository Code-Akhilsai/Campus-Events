import styles from "./eventstyles.module.css";
import Image2 from "../../assets/img2.jpg";
import Image3 from "../../assets/carrer.jpg";
import Image4 from "../../assets/music.jpg";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
const Eventpage = () => {
  const events = [
    {
      Image: Image4,
      Title: "Spring Music Festival",
      Description:
        "Annual music festival featuring student bands and performers.",
      Date: "Tue, Apr 15",
      Time: "6:00 PM",
      Venue: "Main Quad",
    },
    {
      Image: Image3,
      Title: "Career Fair",
      Description:
        "Connect with employers from various industries for internships and job opportunities.",
      Date: "Fri, Mar 28",
      Time: "10:00 AM",
      Venue: "Student Union Ballroom",
    },
    {
      Image: Image2,
      Title: "Dance Show",
      Description:
        "A vibrant dance show celebrating rhythm, energy and artistic expression.",
      Date: "Fri, Mar 28",
      Time: "10:00 AM",
      Venue: "Student Union Ballroom",
    },
  ];
  return (
    <>
      <h1 className={styles.title}>Events</h1>

      {events.map((event, index) => (
        <div key={index} className={styles.eventCard}>
          <img src={event.Image} alt={event.Title} />
          <h2 className={styles.eventTitle}>{event.Title}</h2>
          <p className={styles.eventDescription}>{event.Description}</p>
          <div className={styles.icon_text}>
            <MdOutlineCalendarMonth size={22} />
            <p>{event.Date}</p>
          </div>
          <div className={styles.icon_text}>
            <IoTimeOutline size={23} />
            <p>{event.Time}</p>
          </div>
          <div className={styles.icon_text}>
            <IoLocationOutline size={23} />
            <p>{event.Venue}</p>
          </div>
          <button className={styles.eventBtn}>View Details</button>
        </div>
      ))}
    </>
  );
};

export default Eventpage;
