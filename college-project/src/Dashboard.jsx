import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserRole = async (user) => {
      try {
        const docRef = doc(db, "Admin", user.uid); // Check in Admin collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole("admin");
        } else {
          const generalRef = doc(db, "General User", user.uid); // Check in General User collection
          const generalSnap = await getDoc(generalRef);

          if (generalSnap.exists()) {
            setRole("general");
          }
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserRole(user);
      } else {
        setLoading(false); // Stop loading if no user is logged in
        navigate("/", { replace: true }); // Redirect to home if not logged in
      }
    });

    // Prevent back navigation to the home page
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      unsubscribe(); // Cleanup the listener
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Log out the user
      alert("Logged out successfully!");
      navigate("/", { replace: true }); // Redirect to home page
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    ); // Show loading message while fetching data
  }

  if (!role) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No role found. Please contact support.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    ); // Handle case where no role is found
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>Your role is: {role}</p>
      {role === "admin" ? <AdminUI /> : <GeneralUserUI />}
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

const AdminUI = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>
        This is the Admin UI where you can manage users and perform admin tasks.
      </p>
    </div>
  );
};

const GeneralUserUI = () => {
  return (
    <div>
      <h2>General User Dashboard</h2>
      <p>
        This is the General User UI where you can view your profile and other
        features.
      </p>
    </div>
  );
};

export default Dashboard;
