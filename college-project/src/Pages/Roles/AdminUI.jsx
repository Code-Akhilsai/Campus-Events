import Rintro from "./Rintro";
import Events from "../Components/Events";

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
    </>
  );
};

export default AdminUI;
