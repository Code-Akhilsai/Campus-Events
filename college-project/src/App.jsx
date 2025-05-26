import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard";
import Eventpage from "./Pages/Components/Eventpage";
import Menu from "./Pages/Components/Menu";
import Rmenu from "./Pages/Roles/Rmenu";
import { auth } from "./firebaseConfig"; // Firebase auth instance
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "./firebaseConfig"; // Firestore instance
import Upcoming from "./Pages/Components/Upcoming";
import Footer from "./Pages/Components/Footer";
import Gallery from "./Pages/Components/Gallery";
import Profile from "./Pages/Roles/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore
        try {
          const adminDoc = doc(db, "Admin", currentUser.uid);
          const adminSnapshot = await getDoc(adminDoc);

          if (adminSnapshot.exists()) {
            setUserRole(adminSnapshot.data().role);
          } else {
            const generalUserDoc = doc(db, "General User", currentUser.uid);
            const generalUserSnapshot = await getDoc(generalUserDoc);

            if (generalUserSnapshot.exists()) {
              setUserRole(generalUserSnapshot.data().role);
            } else {
              setUserRole("guest");
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("guest");
        }
      } else {
        setUser(null);
        setUserRole("guest");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setUserRole("guest");
  };

  if (loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }

  const hideMenuBar =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {/* Conditionally Render Menu or Rmenu */}
      {!hideMenuBar &&
        (user ? (
          <Rmenu handleLogoutt={handleLogout} userRole={userRole} />
        ) : (
          <Menu />
        ))}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eventpage" element={<Eventpage userRole={userRole} />} />
        <Route path="/upcoming" element={<Upcoming userRole={userRole} />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile userRole={userRole} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {console.log("user:", user, "hideMenuBar:", hideMenuBar)}

      {!hideMenuBar && <Footer />}
    </>
  );
}

export default App;
