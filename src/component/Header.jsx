import React from "react";
import { Menu, Search, Grid, Clock ,LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userEmail');
    window.localStorage.removeItem('userProfilePicture');
    toast.success("Logged out successfully");
    navigate("/login");
  };
  

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-sm">
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center gap-2">
        <Menu 
          size={24} 
          className="text-green-700 cursor-pointer" 
          onClick={toggleSidebar}
        />
        <h1 className="text-green-700 text-xl font-bold flex items-center">
          <span className="text-2xl">&</span> DoIt
        </h1>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center gap-4">
        <LogOut size={20} className="cursor-pointer" onClick={handleLogout} />
        <Search size={20} className="cursor-pointer" />
        <Grid size={20} className="cursor-pointer" />
        <Clock size={20} className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;