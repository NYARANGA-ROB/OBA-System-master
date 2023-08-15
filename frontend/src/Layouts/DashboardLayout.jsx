import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <section className="outlet">
        <main className="outlet-container">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
