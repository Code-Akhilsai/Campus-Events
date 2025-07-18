import styles from "./eventstyles.module.css";
import { MdOutlineCalendarMonth, MdEdit } from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import image1 from "/assets/music.jpg";
import image2 from "/assets/carrer.jpg";
import image3 from "/assets/img2.jpg";
const EVENTS_DOC_ID = "Eventdata";

const Eventpage = ({ userRole }) => {
  const images = [image1, image2, image3];
  const [events, setEvents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState({});
  const [newEvent, setNewEvent] = useState({
    Image: "",
    Title: "",
    Description: "",
    Date: "",
    Time: "",
    Venue: "",
  });
  const [expandedIndex, setExpandedIndex] = useState(null); // For view details

  useEffect(() => {
    const fetchEvents = async () => {
      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const firestoreEvents = docSnap.data().events;
        setEvents(
          firestoreEvents && firestoreEvents.length > 0 ? firestoreEvents : []
        );
      } else {
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTempData({ ...events[index] });
  };

  const handleChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedEvents = [...events];
      updatedEvents[editingIndex] = { ...tempData };
      setEvents(updatedEvents);

      // Update Firestore
      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      await updateDoc(docRef, { events: updatedEvents });

      setEditingIndex(null);
    } catch (error) {
      alert("Error updating event: " + error.message);
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempData({});
  };

  // Add event directly from the entry card (no button)
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      await updateDoc(docRef, { events: updatedEvents });
      setNewEvent({
        Image: "",
        Title: "",
        Description: "",
        Date: "",
        Time: "",
        Venue: "",
      });
    } catch (error) {
      alert("Error adding event: " + error.message);
      console.error("Error adding event:", error);
    }
  };

  // Delete event
  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      await updateDoc(docRef, { events: updatedEvents });
      if (editingIndex === index) {
        setEditingIndex(null);
        setTempData({});
      }
    } catch (error) {
      alert("Error deleting event: " + error.message);
      console.error("Error deleting event:", error);
    }
  };

  // Toggle expand/collapse for view details
  const handleViewDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <h1 className={styles.title}>Events</h1>
      <div className={styles.container}>
        {/* Render all events */}
        {events.map((event, index) => {
          const isEditing = editingIndex === index;
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`${styles.eventCard} ${
                isExpanded ? styles.expanded : ""
              }`}
            >
              <img src={images[index % images.length]} alt={event.Title} />
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={tempData.Title}
                    onChange={(e) => handleChange("Title", e.target.value)}
                    className={styles.edit_input}
                  />
                  <textarea
                    value={tempData.Description}
                    onChange={(e) =>
                      handleChange("Description", e.target.value)
                    }
                    className={styles.edit_textarea}
                  />
                </>
              ) : (
                <>
                  <div className={styles.edit_row}>
                    <h2 className={styles.eventTitle}>{event.Title}</h2>
                    {userRole === "admin" && (
                      <MdEdit
                        size={18}
                        className={styles.edit_icon}
                        onClick={() => handleEditClick(index)}
                      />
                    )}
                  </div>
                  <p className={styles.eventDescription}>{event.Description}</p>
                </>
              )}
              <div className={styles.icon_text}>
                <MdOutlineCalendarMonth size={22} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.Date}
                    onChange={(e) => handleChange("Date", e.target.value)}
                    className={styles.edit_input}
                  />
                ) : (
                  <p>{event.Date}</p>
                )}
              </div>
              <div className={styles.icon_text}>
                <IoTimeOutline size={23} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.Time}
                    onChange={(e) => handleChange("Time", e.target.value)}
                    className={styles.edit_input}
                  />
                ) : (
                  <p>{event.Time}</p>
                )}
              </div>
              <div className={styles.icon_text}>
                <IoLocationOutline size={23} />
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.Venue}
                    onChange={(e) => handleChange("Venue", e.target.value)}
                    className={styles.edit_input}
                  />
                ) : (
                  <p>{event.Venue}</p>
                )}
              </div>
              {isEditing ? (
                <div className={styles.button_group}>
                  <button className={styles.save_btn} onClick={handleSave}>
                    Save
                  </button>
                  <button className={styles.cancel_btn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="eventv_btn"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    Register
                  </button>
                  <button
                    className={styles.eventBtn}
                    onClick={() => handleViewDetails(index)}
                    type="button"
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                  {userRole === "admin" && (
                    <button
                      className={styles.delete_btn}
                      style={{ marginTop: 8 }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  )}
                  {isExpanded && (
                    <div className="event_details">
                      {/* Add more details here if you have them */}
                      <p
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textAlign: "center",
                          marginTop: "5%",
                          color: "grey",
                          lineHeight: "22px",
                        }}
                      >
                        {event.Description}
                      </p>
                      <p
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textAlign: "center",
                          color: "grey",
                        }}
                      >
                        <strong>Date:</strong> {event.Date}
                      </p>
                      <p
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textAlign: "center",
                          color: "grey",
                        }}
                      >
                        <strong>Time:</strong> {event.Time}
                      </p>
                      <p
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textAlign: "center",
                          color: "grey",
                        }}
                      >
                        <strong>Venue:</strong> {event.Venue}
                      </p>
                      <p
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "14px",
                          textAlign: "center",
                          color: "grey",
                        }}
                      >
                        <strong>Fee:</strong> 200/-
                      </p>
                      {/* You can add more fields as needed */}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {/* Data entry card always visible for admin, at the end */}
        {userRole === "admin" && (
          <form className={styles.eventCard} onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Image URL"
              value={newEvent.Image}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Image: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={newEvent.Title}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Title: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <textarea
              placeholder="Description"
              value={newEvent.Description}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Description: e.target.value }))
              }
              className={styles.edit_textarea}
              required
            />
            <input
              type="text"
              placeholder="Date"
              value={newEvent.Date}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Date: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <input
              type="text"
              placeholder="Time"
              value={newEvent.Time}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Time: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={newEvent.Venue}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Venue: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <div className={styles.button_group}>
              <button className={styles.save_btn} type="submit">
                Add Event
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Eventpage;
