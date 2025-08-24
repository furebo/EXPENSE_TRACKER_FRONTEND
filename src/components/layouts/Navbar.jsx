import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenue from "./SideMenue";

const Navbar = ({ activeMenue, user }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200 py-4 px-7 sticky top-0 z-50">
      {/* Hamburger button */}
      {user && (
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
        </button>
      )}

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {/* Mobile sidebar */}
      {openSideMenu && user && (
        <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-lg z-50">
           <SideMenue activeMenue={activeMenue} /> 
        </div>
      )}
    </div>
  );
};

export default Navbar;
