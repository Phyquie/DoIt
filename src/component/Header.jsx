import React from "react";
import { Menu, Search, Grid2x2, Clock ,LogOut ,Sun ,Moon ,ListCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode , setGridView } from '../redux/darkSlice';





const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.isDarkMode.isDarkMode);
  const isGridView = useSelector((state) => state.isDarkMode.isGridView);
  const dispatch = useDispatch();

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
    // Update localStorage and document classes
    localStorage.setItem('isDarkMode', !isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleGridView = () => {
    dispatch(setGridView());
    localStorage.setItem('isGridView', !isGridView);
  };

  // Initialize dark mode on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (savedDarkMode !== isDarkMode) {
      dispatch(toggleDarkMode());
    }
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
    <header className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700 fixed top-0 z-10">
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center gap-2">
        <Menu 
          size={24} 
          className="text-green-700 dark:text-green-500 cursor-pointer" 
          onClick={toggleSidebar}
        />
        <h1 className="text-green-700 dark:text-green-500 text-xl font-bold flex items-center">
          <span className="text-2xl">&</span> DoIt
            </h1>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center gap-4">
        <LogOut size={20} className="cursor-pointer dark:text-gray-200" onClick={handleLogout} />
        {isGridView ? (
          <ListCheck size={20} className="cursor-pointer dark:text-gray-200" onClick={handleGridView} />
        ) : (
          <Grid2x2 size={20} className="cursor-pointer dark:text-gray-200" onClick={handleGridView} />
        )}
        {isDarkMode ? (
          <Moon 
            size={20} 
            className="cursor-pointer dark:text-gray-200" 
            onClick={handleDarkMode} 
          />
        ) : (
          <Sun 
            size={20} 
            className="cursor-pointer" 
            onClick={handleDarkMode} 
          />
        )}
      </div>
    </header>
  );
};

export default Header;