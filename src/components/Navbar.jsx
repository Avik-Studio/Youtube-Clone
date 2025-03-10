import React, { useState } from "react";
import Avatar from "react-avatar";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import logo from "../../public/logo.png";
import profile from "../../public/profile.jpg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex justify-between items-center fixed top-0 w-full bg-white px-4 md:px-6 py-2 shadow-md z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu className="text-2xl cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)} />
        <img src={logo} alt="Logo" className="w-24 cursor-pointer" />
      </div>
      
      {/* Search Bar */}
      <div className="hidden md:flex w-[40%] items-center">
        <div className="w-full px-4 py-2 border border-gray-400 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full bg-transparent"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="px-4 py-2 border border-gray-400 bg-gray-100 rounded-r-full"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={24} />
        </button>
        <IoMdMic size={42} className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" />
      </div>

      {/* Right Section */}
      <div className="flex space-x-4 items-center">
        <RiVideoAddLine className="text-2xl hidden md:block" />
        <AiOutlineBell className="text-2xl hidden md:block" />
        <Avatar src={profile} size="32" round={true} />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-2 flex flex-col items-center space-y-3 md:hidden">
          <div className="w-[90%] flex items-center border border-gray-400 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full bg-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
            />
            <CiSearch size={24} className="cursor-pointer" onClick={() => searchQueryHandler("searchButton")} />
          </div>
          <IoMdMic size={42} className="border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" />
          <RiVideoAddLine className="text-2xl" />
          <AiOutlineBell className="text-2xl" />
        </div>
      )}
    </div>
  );
}

export default Navbar;