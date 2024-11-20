import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavBar from "./Admin/components/AdminNavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute && <AdminNavBar />}
      <div className="main-content">{children}</div>
    </>
  );
};

export default Layout;
