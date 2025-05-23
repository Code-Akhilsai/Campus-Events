import styles from "./upcoming.module.css";
import {
  MdOutlineCalendarMonth,
  MdEdit,
  MdPeopleOutline,
} from "react-icons/md";

import {
  IoTimeOutline,
  IoLocationOutline,
  IoTicketOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const EVENTS_DOC_ID = "Upcoming_eventdata";

const Upcoming = ({ userRole }) => {
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
    Attendees: "",
    Fee: "",
  });

  const GOOGLE_FORM_URL = "https://forms.gle/uHT1QaUjCBgsX6d4A";

  useEffect(() => {
    const fetchEvents = async () => {
      const docRef = doc(db, "Upcoming_events", EVENTS_DOC_ID);
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
      const docRef = doc(db, "Upcoming_events", EVENTS_DOC_ID);
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
      const docRef = doc(db, "Upcoming_events", EVENTS_DOC_ID);
      await updateDoc(docRef, { events: updatedEvents });
      setNewEvent({
        Image: "",
        Title: "",
        Description: "",
        Date: "",
        Time: "",
        Venue: "",
        Attendees: "",
        Fee: "",
      });
    } catch (error) {
      alert("Error adding event: " + error.message);
      console.error("Error adding event:", error);
    }
  };

  const handleShare = (event) => {
    const shareData = {
      title: event.Title,
      text: `${event.Title}\n${event.Description}\nDate: ${event.Date}\nTime: ${event.Time}\nVenue: ${event.Venue}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        alert("Sharing failed: " + err.message);
      });
    } else {
      // Fallback: copy to clipboard
      const textToCopy = `${event.Title}\n${event.Description}\nDate: ${event.Date}\nTime: ${event.Time}\nVenue: ${event.Venue}`;
      navigator.clipboard.writeText(textToCopy);
      alert("Event details copied to clipboard!");
    }
  };

  const handleRegister = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <>
      <h1 className={styles.title}>Upcoming</h1>
      <div className={styles.container}>
        {/* Render all events */}
        {events.map((event, index) => {
          const isEditing = editingIndex === index;
          return (
            <div key={index}>
              {/* Main Card: Image, Title, Description */}
              <div className={styles.maincard}>
                <div className={styles.eventCard}>
                  <img src={event.Image} alt={event.Title} />
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
                      <p className={styles.eventDescription}>
                        {event.Description}
                      </p>
                    </>
                  )}
                </div>
                {/* Details Card: Date, Time, Venue, Fee, Register/Delete */}
                <div className={styles.detailsCard}>
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
                      <span>{event.Date}</span>
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
                      <span>{event.Time}</span>
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
                      <span>{event.Venue}</span>
                    )}
                  </div>

                  <div className={styles.icon_text}>
                    <MdPeopleOutline size={23} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.Attendees}
                        onChange={(e) =>
                          handleChange("Attendees", e.target.value)
                        }
                        className={styles.edit_input}
                      />
                    ) : (
                      <span>{event.Attendees}</span>
                    )}
                  </div>
                  <div className={styles.icon_text}>
                    <IoTicketOutline size={22} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.Fee}
                        onChange={(e) => handleChange("Fee", e.target.value)}
                        className={styles.edit_input}
                        list="fee_input"
                      />
                    ) : (
                      <span>{event.Fee}</span>
                    )}
                  </div>
                  {/* Buttons */}
                  {isEditing ? (
                    <div className={styles.button_group}>
                      <button className={styles.save_btn} onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className={styles.cancel_btn}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.eventBtn}
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                      {userRole === "admin" ? (
                        <button
                          className={styles.delete_btn}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this event?"
                              )
                            ) {
                              const updatedEvents = events.filter(
                                (_, i) => i !== index
                              );
                              setEvents(updatedEvents);
                              const docRef = doc(
                                db,
                                "Upcoming_events",
                                EVENTS_DOC_ID
                              );
                              updateDoc(docRef, { events: updatedEvents });
                            }
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className={styles.sharebtn}
                          onClick={() => handleShare(event)}
                        >
                          {" "}
                          <IoShareSocialOutline color="#2d10ef" size={19} />
                          Share
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
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

            <input
              type="text"
              placeholder="attendees"
              value={newEvent.Attendees}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Attendees: e.target.value }))
              }
              className={styles.edit_input}
              required
            />
            <input
              type="text"
              placeholder="Fee"
              value={newEvent.Fee}
              onChange={(e) =>
                setNewEvent((ev) => ({ ...ev, Fee: e.target.value }))
              }
              className={styles.edit_input}
              required
              list="listvalues"
            />
            <datalist id="listvalues">
              <option value="Free" />
            </datalist>

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

export default Upcoming;
