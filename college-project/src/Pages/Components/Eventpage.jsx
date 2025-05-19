import styles from "./eventstyles.module.css";
const Eventpage = () => {
  const events = [
    {
      Image: "https://via.placeholder.com/150",
      Title: "Spring Music Festival",
      Description:
        "Annual music festival featuring student bands and performers.",
      Date: "Tue, Apr 15",
      Time: "6:00 PM",
      Venue: "Main Quad",
    },
    {
      Image: "https://via.placeholder.com/150",
      Title: "Career Fair",
      Description:
        "Connect with employers from various industries for internships and job opportunities.",
      Date: "Fri, Mar 28",
      Time: "10:00 AM",
      Venue: "Student Union Ballroom",
    },
    {
      Image: "https://via.placeholder.com/150",
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
          <img
            src={event.Image}
            alt={event.Title}
            className={styles.eventImage}
          />
          <h2 className={styles.eventTitle}>{event.Title}</h2>
          <p className={styles.eventDescription}>{event.Description}</p>
          <p className={styles.eventDate}>Date: {event.Date}</p>
          <p className={styles.eventTime}>Time: {event.Time}</p>
          <p className={styles.eventVenue}>Venue: {event.Venue}</p>
          <button>View Details</button>
        </div>
      ))}
    </>
  );
};

export default Eventpage;
