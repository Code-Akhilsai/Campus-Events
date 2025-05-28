import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "./profilestyles.module.css";
import image from "/assets/image.jpg";
import { app } from "../../firebaseConfig";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    role: "",
    college: "",
    branch: "",
    phone: "",
  });

  const [docPath, setDocPath] = useState(""); // To store which document path to update (Admin or General User)

  useEffect(() => {
    const fetchProfileData = async () => {
      const db = getFirestore(app);
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;

        // Try Admin first, fallback to General User
        const adminDocRef = doc(db, "Admin", uid);
        const generalDocRef = doc(db, "General User", uid);

        let docSnap = await getDoc(adminDocRef);
        if (docSnap.exists()) {
          setDocPath(`Admin/${uid}`);
        } else {
          docSnap = await getDoc(generalDocRef);
          if (docSnap.exists()) {
            setDocPath(`General User/${uid}`);
          } else {
            // New user, let's default to General User
            setDocPath(`General User/${uid}`);
          }
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData((prev) => ({
            ...prev,
            username: data.username || "",
            email: data.email || "",
            role: data.role || "",
            college: data.college || "",
            branch: data.branch || "",
            phone: data.phone || "",
          }));
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!docPath) return alert("No user data loaded.");

    const db = getFirestore(app);
    const docRef = doc(db, docPath);

    try {
      await setDoc(docRef, profileData, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <div className={styles.profileCard}>
        <img src={image} className={styles.avatar} />

        <input
          type="text"
          name="username"
          className={styles.inputs}
          placeholder="   Username"
          value={profileData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          className={styles.inputs}
          placeholder="   Email"
          value={profileData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          className={styles.inputs}
          placeholder="   Role"
          value={profileData.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="college"
          className={styles.inputs}
          placeholder="   College"
          value={profileData.college}
          onChange={handleChange}
        />

        <input
          type="text"
          name="branch"
          className={styles.inputs}
          placeholder="   Branch"
          value={profileData.branch}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          className={styles.inputs}
          placeholder="   Phone"
          value={profileData.phone}
          onChange={handleChange}
        />

        <button className={styles.editBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Profile;
