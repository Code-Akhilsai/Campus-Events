import { useState } from "react";
import styles from "./signupstyles.module.css";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Import Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import useStore from "../Store/store";

const Signup = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    showPassword,
    setShowPassword,
    error,
    setError,
  } = useStore();

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigation

  const togglePasswordVisibility = () => {
    setShowPassword();
  };

  // Handle Email/Password Signup
  const handleSignup = async () => {
    if (!role) {
      setError("Please select a role before signing up.");
      return;
    }
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(
        doc(db, role === "admin" ? "Admin" : "General User", user.uid),
        {
          username,
          email,
          role,
        }
      );

      console.log("User signed up and added to Firestore:", user);
      alert(`Signup successful! Role: ${role}`);
      navigate("/login"); // Navigate to login page
    } catch (err) {
      setError("Error signing up: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    if (!role) {
      setError("Please select a role before signing up with Google.");
      return;
    }
    setLoading(true); // Start loading
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Add user data to Firestore
      await setDoc(
        doc(db, role === "admin" ? "Admin" : "General User", user.uid),
        {
          username: user.displayName || "Google User",
          email: user.email,
          role,
        }
      );

      console.log("Google Signup successful and added to Firestore:", user);
      alert("Signup with Google successful!");
      navigate("/login"); // Navigate to login page
    } catch (err) {
      setError("Error signing up with Google: " + err.message);
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
      <p className={styles.title}>Create an account</p>
      <div className={styles.signupdialog}>
        <input
          type="text"
          placeholder="Username"
          className={styles.inputs}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.inputs}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <select
          className={styles.inputs2}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Choose your role
          </option>
          <option value="admin">Admin</option>
          <option value="general user">General User</option>
        </select>
        {error && (
          <div className={styles.edialog}>
            <p className={styles.error}>{error}</p>
          </div>
        )}
        <button
          className={styles.signupbtn}
          onClick={handleSignup}
          disabled={loading} // Disable button while loading
        >
          Signup
        </button>

        <div className={styles.orSeparator}>
          <hr className={styles.line} />
          <span>or</span>
          <hr className={styles.line} />
        </div>

        <button
          className={styles.googleSignupBtn}
          onClick={handleGoogleSignup}
          disabled={loading} // Disable button while loading
        >
          Signup with Google
        </button>

        <p className={styles.text}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
