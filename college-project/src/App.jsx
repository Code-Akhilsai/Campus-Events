import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
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
  const [user, setUser] = useState(null); // Track logged-in user
  const [userRole, setUserRole] = useState("guest"); // Track user role
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore
        try {
          // Check in the "Admin" collection
          const adminDoc = doc(db, "Admin", currentUser.uid);
          const adminSnapshot = await getDoc(adminDoc);

          if (adminSnapshot.exists()) {
            setUserRole(adminSnapshot.data().role); // Set role from Admin collection
            console.log("User role from Admin:", adminSnapshot.data().role);
          } else {
            // If not found in "Admin", check in "General User"
            const generalUserDoc = doc(db, "General User", currentUser.uid);
            const generalUserSnapshot = await getDoc(generalUserDoc);

            if (generalUserSnapshot.exists()) {
              setUserRole(generalUserSnapshot.data().role); // Set role from General User collection
              console.log(
                "User role from General User:",
                generalUserSnapshot.data().role
              );
            } else {
              console.log("No such user document in Admin or General User!");
              setUserRole("guest"); // Default to guest if no role is found
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("guest"); // Default to guest on error
        }
      } else {
        setUser(null);
        setUserRole("guest");
      }
      setLoading(false); // Stop loading after fetching user data
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setUserRole("guest");
  };

  if (loading) {
    return <h1>Loading...</h1>; // Show a loading screen while fetching user data
  }

  return (
    <>
      {/* Conditionally Render Menu or Rmenu */}
      {user ? (
        <Rmenu handleLogoutt={handleLogout} userRole={userRole} />
      ) : (
        <Menu />
      )}

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
