import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard";
import Upload from "./Pages/Roles/Upload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
