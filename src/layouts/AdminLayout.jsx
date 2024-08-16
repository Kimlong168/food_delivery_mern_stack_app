import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="container bg-red-100">
      {" "}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
