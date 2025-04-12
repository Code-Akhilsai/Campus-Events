import { useState } from "react";
import styles from "./signupstyles.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.signuppage}>
      <p className={styles.title}>Login to your account</p>
      <div className={styles.logindialog}>
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

        <button className={styles.signupbtn}>Login</button>

        {/* Add the "or" separator with lines */}
        <div className={styles.orSeparator}>
          <hr className={styles.line} />
          <span>or</span>
          <hr className={styles.line} />
        </div>

        {/* Add the "Login with Google" button */}
        <button className={styles.googleSignupBtn}>Login with Google</button>

        <p className={styles.text}>
          Don't have an account ? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
