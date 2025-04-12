import { useState } from "react";
import styles from "./signupstyles.module.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.signuppage}>
      <p className={styles.title}>Create an account</p>
      <div className={styles.signupdialog}>
        <input type="text" placeholder="Username" className={styles.inputs} />
        <input type="email" placeholder="Email" className={styles.inputs} />

        {/* Password Input with Toggle */}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.inputs}
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <select className={styles.inputs2}>
          <option value="" disabled selected>
            Choose your role
          </option>
          <option value="admin">Admin</option>
          <option value="general">General User</option>
        </select>
        <button className={styles.signupbtn}>Signup</button>

        {/* Add the "or" separator with lines */}
        <div className={styles.orSeparator}>
          <hr className={styles.line} />
          <span>or</span>
          <hr className={styles.line} />
        </div>

        {/* Add the "Signup with Google" button */}
        <button className={styles.googleSignupBtn}>Signup with Google</button>

        <p className={styles.text}>
          Already have an account ? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
