import { useState } from "react";
import styles from "./signupstyles.module.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; // Import Firebase Auth functions
import { auth } from "../firebaseConfig"; // Import Firebase Auth instance
import { useNavigate } from "react-router-dom"; // For navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle Email/Password Login
  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/dashboard", { replace: true }); // Navigate to dashboard and prevent back navigation
    } catch (err) {
      setError("Error logging in: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login successful:", result.user);
      alert("Login with Google successful!");
      navigate("/dashboard", { replace: true }); // Navigate to dashboard and prevent back navigation
    } catch (err) {
      setError("Error logging in with Google: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.signuppage}>
      {loading && (
        <div className={styles.loadingDialog}>
          <p>Loading...</p>
        </div>
      )}
      <p className={styles.title}>Login to your account</p>
      <div className={styles.logindialog}>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputs}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input with Toggle */}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.inputs}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <div className={styles.edialog}>
            <p className={styles.error}>{error}</p>
          </div>
        )}

        <button
          className={styles.signupbtn}
          onClick={handleLogin}
          disabled={loading} // Disable button while loading
        >
          Login
        </button>

        <div className={styles.orSeparator}>
          <hr className={styles.line} />
          <span>or</span>
          <hr className={styles.line} />
        </div>

        <button
          className={styles.googleSignupBtn}
          onClick={handleGoogleLogin}
          disabled={loading} // Disable button while loading
        >
          Login with Google
        </button>

        <p className={styles.text}>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
