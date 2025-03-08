import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Home, Star, Map, UserPlus, Plus, Info ,ClipboardList ,CalendarCheck2} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';




const TaskManager = ({ isOpen }) => {
  const [userName, setUserName] = React.useState('');
  const [userProfilePicture, setUserProfilePicture] = React.useState('');
  const [activeRoute, setActiveRoute] = React.useState(window.location.pathname);
  

  useEffect(() => { 
    setUserName(window.localStorage.getItem('userName'));
    setUserProfilePicture(window.localStorage.getItem('userProfilePicture'));
    // userEmail is not used in the component, so we can skip it
  }, []);
  const navigate = useNavigate();
  const pendingTasks = useSelector(
    (state) => state.tasks.tasks.filter(
      (task) => task.userId === localStorage.getItem('userId') && task.status === false
    ),[localStorage.getItem('userId')]
  );
  
  const completedTasks = useSelector(
    (state) => state.tasks.tasks.filter(
      (task) => task.userId === localStorage.getItem('userId') && task.status === true
    ),[localStorage.getItem('userId')]
  );

  // count both of them
  const pendingTasksCount = pendingTasks.length;
  const completedTasksCount = completedTasks.length;

  const handleNavigation = (path) => {
    setActiveRoute(path);
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`fixed top-0 md:sticky md:flex w-[260px] h-screen p-4 flex-col items-center z-10 bg-green-50 dark:bg-gray-800 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hidden md:block`}>  

        {/* Profile Section */}
        <img
          src={userProfilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full mb-2"
        />
        <h2 className="text-sm font-medium text-black dark:text-white">Hi, {userName}</h2>

        {/* Desktop Menu */}
        <nav className="w-full mt-4">
          <ul className="space-y-2">
            <li 
              className={`flex items-center gap-2 p-2 rounded text-black cursor-pointer dark:text-white ${
                activeRoute === '/all' ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-200'
              }`} 
              onClick={() => handleNavigation('/all')}
            >
              <ClipboardList size={20} /> All Tasks
            </li>
            <li 
              className={`flex items-center gap-2 p-2 rounded text-black cursor-pointer dark:text-white ${
                activeRoute === '/' ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-200'
              }`} 
              onClick={() => handleNavigation('/')}
            >
              <CalendarCheck2 size={20} /> Today
            </li>
            <li 
              className={`flex items-center gap-2 p-2 rounded text-black cursor-pointer dark:text-white ${
                activeRoute === '/important' ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-200'
              }`} 
              onClick={() => handleNavigation('/important')}
            >
              <Star size={20} /> Important
            </li>
            <li 
              className={`flex items-center gap-2 p-2 rounded text-black cursor-pointer dark:text-white hover:bg-gray-200
                
              `} 
            >
              <Map size={20} /> Planned
            </li>
            <li 
              className={`flex items-center gap-2 p-2 rounded text-black cursor-pointer dark:text-white hover:bg-gray-200
                
              `} 
            >
              <UserPlus size={20} /> Assigned to me
            </li>
          </ul>
        </nav>

        {/* Add List */}
         <div className="w-full mt-6 p-2 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 text-black dark:text-white">
          <Plus size={20} /> Add list
        </div>

        {/* Today Tasks Section */}
        <div className="w-full bg-white p-4 mt-6 rounded shadow dark:bg-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-black dark:text-white">Today Tasks</h3>
            <Info size={16} className="text-gray-500" />
          </div>
          <p className="text-2xl font-bold text-black dark:text-white">{pendingTasksCount + completedTasksCount}</p>

          {/* Pie Chart */}
          <PieChart width={120} height={120}>
            <Pie
              data={[
                { value: pendingTasksCount, color: '#4c8c4a' },
                { value: completedTasksCount, color: '#132f15' }
              ]}
              cx={60}
              cy={60}
              innerRadius={30}
              outerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              {[
                { value: pendingTasksCount, color: '#4c8c4a' },
                { value: completedTasksCount, color: '#132f15' }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Legends */}
          <div className="flex justify-center mt-2 space-x-4 text-sm dark:text-white">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#4c8c4a] rounded-full"></span> Pending
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#132f15] rounded-full"></span> Done
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
        
        <nav className="flex justify-around items-center h-16">
          <button 
            onClick={() => handleNavigation('/all')}
            className={`flex flex-col items-center justify-center w-16 h-full ${
              activeRoute === '/all' ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <ClipboardList size={20} />
            <span className="text-xs mt-1">All</span>
          </button>

          <button 
            onClick={() => handleNavigation('/')}
            className={`flex flex-col items-center justify-center w-16 h-full ${
              activeRoute === '/' ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <CalendarCheck2 size={20} />
            <span className="text-xs mt-1">Today</span>
          </button>

          <button 
            onClick={() => handleNavigation('/important')}
            className={`flex flex-col items-center justify-center w-16 h-full ${
              activeRoute === '/important' ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Star size={20} />
            <span className="text-xs mt-1">Important</span>
          </button>

          <button 
            className="flex flex-col items-center justify-center w-16 h-full text-gray-600 dark:text-gray-300"
          >
            <Map size={20} />
            <span className="text-xs mt-1">Planned</span>
          </button>

          <button 
            className="flex flex-col items-center justify-center w-16 h-full text-gray-600 dark:text-gray-300"
          >
            <UserPlus size={20} />
            <span className="text-xs mt-1">Assigned</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default TaskManager;
