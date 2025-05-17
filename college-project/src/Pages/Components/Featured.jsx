import { useState } from "react";
import Image1 from "../../assets/annual.jpg";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { MdPeopleOutline, MdEdit } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Featured = ({ userRole }) => {
  const [eventData, setEventData] = useState({
    title: "Annual Spring Concert",
    description:
      "Join us for the biggest musical event of the year featuring our  university symphony orchestra and choir. This year's theme  celebrates classical compositions from around the world with special  guest performances from renowned musicians.",
    date: "Sunday, April 12, 2025",
    time: "7:00pm",
    location: "Auditorium",
    attendees: "342 people attending",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

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
      const eventId = "main";
      const docRef = doc(db, "featuredEvents", eventId);
      await updateDoc(docRef, { [editField]: tempValue });
      setEventData((prev) => ({ ...prev, [editField]: tempValue }));
      setEditField(null);
    } catch (error) {
      alert("Error updating event: " + error.message);
      console.error("Error updating event:", error);
    }
  };
  return (
    <section className="featured_container">
      <p className="featured_title">Featured Event</p>
      <p className="subtitle">Don't miss out on this special event</p>

      <div className="featured_cont2">
        <img src={Image1} />
        <div className="featured_cont3">
          {/* Title */}
          <div className="field_row">
            {editField === "title" ? (
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
                <p className="fevent_title">{eventData.title}</p>
                {userRole === "admin" && (
                  <MdEdit
                    size={20}
                    className="edit_icon"
                    onClick={() => handleEditClick("title")}
                  />
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div className="field_row">
            {editField === "description" ? (
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
                <p className="fevent_des">{eventData.description}</p>
                {userRole === "admin" && (
                  <MdEdit
                    size={20}
                    className="edit_icon"
                    onClick={() => handleEditClick("description")}
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
              {editField === "date" ? (
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
                  <p>{eventData.date}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("date")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Time */}
            <div className="icon_text">
              <IoTimeOutline size={23} />
              {editField === "time" ? (
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
                  <p>{eventData.time}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("time")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Location */}
            <div className="icon_text">
              <IoLocationOutline size={23} />
              {editField === "location" ? (
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
                  <p>{eventData.location}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("location")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Attendees */}
            <div className="icon_text">
              <MdPeopleOutline size={23} />
              {editField === "attendees" ? (
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
                  <p>{eventData.attendees}</p>
                  {userRole === "admin" && (
                    <MdEdit
                      size={18}
                      className="edit_icon"
                      onClick={() => handleEditClick("attendees")}
                    />
                  )}
                </>
              )}
            </div>

            {/* Buttons */}
            <button className="fregister_btn">Register Now</button>
            <button className="viewbtn">View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
