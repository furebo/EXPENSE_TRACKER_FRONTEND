
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SideMenue from "./SideMenue";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenue }) => {
  const { user, loading } = useContext(UserContext);
  console.log("This is the user from the context: ",user)

  if (loading) return <div>Loading...</div>; // show a spinner/loading message

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar activeMenue={activeMenue} user={user} />

      <div className="flex flex-1">
        {/* Sidebar only visible on desktop and if user exists */}
        {user && (
          <div className="hidden lg:block w-64">
            <SideMenue activeMenue={activeMenue} /> 
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
