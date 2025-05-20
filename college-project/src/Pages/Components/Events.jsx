import { useState, useEffect } from "react";
import { MdOutlineCalendarMonth, MdEdit } from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const EVENTS_DOC_ID = "Eventdata";

const Events = ({ userRole }) => {
  const [eventData, setEventData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(null); // <-- new state
  const nav = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const firestoreEvents = docSnap.data().events;
        if (firestoreEvents && firestoreEvents.length > 0) {
          setEventData(firestoreEvents.slice(0, 3));
        } else {
          setEventData([]);
        }
      } else {
        setEventData([]);
      }
    };
    fetchEvents();
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTempData({ ...eventData[index] });
  };

  const handleChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedEvents = [...eventData];
      updatedEvents[editingIndex] = { ...tempData };
      setEventData(updatedEvents);

      const docRef = doc(db, "Events", EVENTS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const allEvents = docSnap.data().events;
        allEvents[editingIndex] = { ...tempData };
        await updateDoc(docRef, { events: allEvents });
      }

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

  // Toggle expand/collapse
  const handleViewDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <p className="eventcont_title" id="event_container">
        Events
      </p>
      <section className="event_container">
        <br />
        {eventData.map((data, index) => {
          const isEditing = editingIndex === index;
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`event_cont${isExpanded ? " expanded" : ""}`}
            >
              <img src={data.Image} alt={data.Title} />
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={tempData.Title}
                    onChange={(e) => handleChange("Title", e.target.value)}
                    className="edit_input"
                  />
                  <textarea
                    value={tempData.Description}
                    onChange={(e) =>
                      handleChange("Description", e.target.value)
                    }
                    className="edit_textarea"
                  />
                </>
              ) : (
                <>
                  <div className="edit_row">
                    <p className="event_title">{data.Title}</p>
                    {userRole === "admin" && (
                      <MdEdit
                        size={18}
                        className="edit_icon"
                        onClick={() => handleEditClick(index)}
                      />
                    )}
                  </div>
                  <p className="event_des">{data.Description}</p>
                </>
              )}

              <div className="icons2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={tempData.Date}
                      onChange={(e) => handleChange("Date", e.target.value)}
                      className="edit_input"
                    />
                    <input
                      type="text"
                      value={tempData.Time}
                      onChange={(e) => handleChange("Time", e.target.value)}
                      className="edit_input"
                    />
                    <input
                      type="text"
                      value={tempData.Venue}
                      onChange={(e) => handleChange("Venue", e.target.value)}
                      className="edit_input"
                    />
                    <div className="button_group">
                      <button className="save_btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel_btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="icon_text2">
                      <MdOutlineCalendarMonth size={22} />
                      <p>{data.Date}</p>
                    </div>
                    <div className="icon_text2">
                      <IoTimeOutline size={23} />
                      <p>{data.Time}</p>
                    </div>
                    <div className="icon_text2">
                      <IoLocationOutline size={23} />
                      <p>{data.Venue}</p>
                    </div>
                    <button className="eventv_btn">Register</button>
                    <button
                      className="viewdetails"
                      onClick={() => handleViewDetails(index)}
                      type="button"
                    >
                      {isExpanded ? "Hide details" : "View details"}
                    </button>
                    {isExpanded && (
                      <div className="event_details">
                        {/* Add more details here if you have them */}
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            textAlign: "center",
                            marginTop: "12%",
                            color: "grey",
                            lineHeight: "22px",
                          }}
                        >
                          {data.Description}
                        </p>
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            textAlign: "center",
                            color: "grey",
                          }}
                        >
                          <strong>Date:</strong> {data.Date}
                        </p>
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            textAlign: "center",
                            color: "grey",
                          }}
                        >
                          <strong>Time:</strong> {data.Time}
                        </p>
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            textAlign: "center",
                            color: "grey",
                          }}
                        >
                          <strong>Venue:</strong> {data.Venue}
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
            </div>
          );
        })}
      </section>
      <button className="eventv_btn2" onClick={() => nav("/eventpage")}>
        View All Events
      </button>
      <br />
      <br />
    </>
  );
};

export default Events;
