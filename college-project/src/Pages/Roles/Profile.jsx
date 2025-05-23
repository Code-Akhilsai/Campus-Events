import { useState } from "react";
import styles from "./profilestyles.module.css";

const Profile = ({ user }) => {
  // Example user data (replace with real user data as needed)
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?img=3",
    college: "ABC College",
    branch: "Computer Science",
    year: "2nd Year",
    phone: "+91 9876543210",
  };
  const [userData, setUserData] = useState(user || defaultUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(userData);

  const handleEdit = () => {
    setEditing(true);
    setForm(userData);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(userData);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserData(form);
    setEditing(false);
    // Here you can also add code to update the profile in your backend/database
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <img src={userData.avatar} alt="Profile" className={styles.avatar} />
          {editing ? (
            <>
              <input
                className={styles.name}
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className={styles.role}
                name="role"
                value={form.role}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2 className={styles.name}>{userData.name}</h2>
              <p className={styles.role}>{userData.role}</p>
            </>
          )}
          <div className={styles.infoSection}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Email</span>
              {editing ? (
                <input
                  className={styles.value}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              ) : (
                <span className={styles.value}>{userData.email}</span>
              )}
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>College</span>
              {editing ? (
                <input
                  className={styles.value}
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                />
              ) : (
                <span className={styles.value}>{userData.college}</span>
              )}
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Branch</span>
              {editing ? (
                <input
                  className={styles.value}
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                />
              ) : (
                <span className={styles.value}>{userData.branch}</span>
              )}
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Year</span>
              {editing ? (
                <input
                  className={styles.value}
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              ) : (
                <span className={styles.value}>{userData.year}</span>
              )}
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>Phone</span>
              {editing ? (
                <input
                  className={styles.value}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              ) : (
                <span className={styles.value}>{userData.phone}</span>
              )}
            </div>
          </div>
          {editing ? (
            <div>
              <button className={styles.editBtn} onClick={handleSave}>
                Save
              </button>
              <button
                className={styles.editBtn}
                style={{
                  marginLeft: "1rem",
                  background: "#eee",
                  color: "#333",
                }}
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className={styles.editBtn} onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <br /> <br /> <br />
    </>
  );
};

export default Profile;
