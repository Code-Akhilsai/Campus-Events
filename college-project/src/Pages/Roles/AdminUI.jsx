import React from "react";
import Rmenu from "./Rmenu";
import Rintro from "./Rintro";
import Events from "../Components/Events";
import Footer from "../Components/Footer";

import Featured from "../Components/Featured";

const AdminUI = ({ handleLogout, userRole }) => {
  return (
    <>
      <Rmenu handleLogoutt={handleLogout} userRole={userRole} />
      <Rintro />
      <br />
      <br />
      <Featured />
      <br />
      <Events />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminUI;
