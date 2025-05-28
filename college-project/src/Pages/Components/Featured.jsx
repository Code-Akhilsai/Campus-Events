import { useState, useEffect } from "react";
import {
  MdOutlineCalendarMonth,
  MdEdit,
  MdPeopleOutline,
} from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import image from "/assets/music.jpg";

const EVENTS_DOC_ID = "Upcoming_eventdata";

const Featured = ({ userRole }) => {
  const [eventData, setEventData] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const nav = useNavigate();

  const upcoming_page = () => {
    nav("/upcoming");
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "Upcoming_events", EVENTS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const events = docSnap.data().events;
        if (events && events.length > 0) {
          setEventData(events[0]); // Use the first upcoming event
        }
      }
    };
    fetchEvent();
  }, []);

  const handleEditClick = (field) => {
    setEditField(field);
    setTempValue(eventData[field]);
  };

  const handleCancel = () => {
    setEditField(null);
    setTempValue("");
  };

  const handleSave = async () => {
    try {
      if (!editField) {
        alert("No field selected for editing!");
        return;
      }
      // Update the field in Firestore for the first event only
      const docRef = doc(db, "Upcoming_events", EVENTS_DOC_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const events = docSnap.data().events;
        if (events && events.length > 0) {
          events[0][editField] = tempValue;
          await updateDoc(docRef, { events });
          setEventData({ ...eventData, [editField]: tempValue });
        }
      }
      setEditField(null);
    } catch (error) {
      alert("Error updating event: " + error.message);
      console.error("Error updating event:", error);
    }
  };

  if (!eventData) {
    return (
      <section className="featured_container">
        <p className="featured_title">Featured Event</p>
        <p className="subtitle">Don't miss out on this special event</p>
        <div className="featured_cont2">
          <center>Loading...</center>
        </div>
      </section>
    );
  }

  const GOOGLE_FORM_URL = "https://forms.gle/uHT1QaUjCBgsX6d4A";

  const handleRegister = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <section className="featured_container">
      <p className="featured_title">Featured Event</p>
      <p className="subtitle">Don't miss out on this special event</p>

      <div className="featured_cont2">
        <img src={image} alt={eventData.Title} loading="lazy" />
        <div className="featured_cont3">
          {/* Title */}
          <div className="field_row">
            {editField === "Title" ? (
              <>
                <input
                  className="edit_input"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
                <button onClick={handleSave} className="save_btn">
                  Save
                </button>
                <button onClick={handleCancel} className="cancel_btn">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="fevent_title">{eventData.Title}</p>
                {userRole === "admin" && (
                  <MdEdit
                    size={20}
                    className="edit_icon"
                    onClick={() => handleEditClick("Title")}
                  />
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div className="field_row">
            {editField === "Description" ? (
              <>
                <textarea
                  className="edit_textarea"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
                <button onClick={handleSave} className="save_btn">
                  Save
                </button>
                <button onClick={handleCancel} className="cancel_btn">
                  Cancel
                </button>
              </>
            ) : (
              <div className="description_row">
                <p className="fevent_des">{eventData.Description}</p>
                {userRole === "admin" && (
                  <MdEdit
                    size={20}
                    className="edit_icon"
                    onClick={() => handleEditClick("Description")}
                  />
                )}
              </div>
            )}
          </div>

          {/* Icons Section */}
          <div className="icons">
            {/* Date */}
            <div className="icon_text">
              <MdOutlineCalendarMonth size={22} />
              {editField === "Date" ? (
                <>
                  <input
                    className="edit_input"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={handleSave} className="save_btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel_btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{eventData.Date}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("Date")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Time */}
            <div className="icon_text">
              <IoTimeOutline size={23} />
              {editField === "Time" ? (
                <>
                  <input
                    className="edit_input"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={handleSave} className="save_btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel_btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{eventData.Time}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("Time")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Location */}
            <div className="icon_text">
              <IoLocationOutline size={23} />
              {editField === "Venue" ? (
                <>
                  <input
                    className="edit_input"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={handleSave} className="save_btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel_btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{eventData.Venue}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("Venue")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Attendees */}

            <div className="icon_text">
              <MdPeopleOutline size={23} />
              {editField === "Attendees" ? (
                <>
                  <input
                    className="edit_input"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={handleSave} className="save_btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel_btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{eventData.Attendees}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("Attendees")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Buttons */}
            <button className="fregister_btn" onClick={handleRegister}>
              Register Now
            </button>
            <button className="viewbtn" onClick={upcoming_page}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
