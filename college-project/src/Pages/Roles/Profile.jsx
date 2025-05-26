import styles from "./profilestyles.module.css";
import image from "../../assets/image.jpg";

const Profile = () => {
  return (
    <>
      <div className={styles.profileCard}>
        <img src={image} className={styles.avatar} />
        <input
          type="text"
          className={styles.inputs}
          placeholder="   Username"
        />
        <input type="text" className={styles.inputs} placeholder="   Email" />
        <input type="text" className={styles.inputs} placeholder="   Role" />
        <input type="text" className={styles.inputs} placeholder="   College" />
        <input type="text" className={styles.inputs} placeholder="   Branch" />
        <input type="text" className={styles.inputs} placeholder="   Phone" />

        <button className={styles.editBtn}>Edit Profile</button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Profile;
