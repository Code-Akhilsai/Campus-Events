import Rintro from "./Rintro";
import Events from "../Components/Events";
import Footer from "../Components/Footer";
import Featured from "../Components/Featured";

const AdminUI = ({ userRole }) => {
  return (
    <>
      <Rintro />
      <br />
      <br />
      <Featured userRole={userRole} />
      <br />
      <Events userRole={userRole} />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AdminUI;
