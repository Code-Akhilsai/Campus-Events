import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard";
import Upload from "./Pages/Roles/Upload";
import Eventpage from "./Pages/Components/Eventpage";
import Menu from "./Pages/Components/Menu";
import Rmenu from "./Pages/Roles/Rmenu";
import { auth } from "./firebaseConfig"; // Firebase auth instance
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "./firebaseConfig"; // Firestore instance

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
    return <h1>Loading...</h1>;
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
        <Route path="/upload" element={<Upload />} />
        <Route path="/eventpage" element={<Eventpage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
