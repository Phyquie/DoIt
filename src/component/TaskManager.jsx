import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Home, Star, Map, UserPlus, Plus, Info } from "lucide-react";
import { useSelector } from "react-redux";



const userName = window.localStorage.getItem('userName');
const userEmail = window.localStorage.getItem('userEmail');
const userProfilePicture = window.localStorage.getItem('userProfilePicture');

const TaskManager = ({ isOpen }) => {
  const pendingTasks = useSelector(
    (state) => state.tasks.tasks.filter(
      (task) => task.userId === localStorage.getItem('userId') && task.status === false
    )
  );
  
  const completedTasks = useSelector(
    (state) => state.tasks.tasks.filter(
      (task) => task.userId === localStorage.getItem('userId') && task.status === true
    )
  );

  // count both of them
  const pendingTasksCount = pendingTasks.length;
  const completedTasksCount = completedTasks.length;

  return (
    <div className={`w-[260px] bg-green-50 h-screen p-4 flex flex-col items-center transition-all duration-500 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 z-10`}>
      {/* Profile Section */}
      <img
        src={userProfilePicture}
        alt="Profile"
        className="w-20 h-20 rounded-full mb-2"
      />
      <h2 className="text-lg font-medium text-black">Hey, {userName}</h2>

      {/* Menu */}
      <nav className="w-full mt-4">
        <ul className="space-y-2">
          <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black">
            <Home size={20} /> All Tasks
          </li>
          <li className="flex items-center gap-2 p-2 bg-green-100 rounded text-black">
            <Home size={20} className="text-green-700" /> Today
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black ">
            <Star size={20} /> Important
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black">
            <Map size={20} /> Planned
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-black">
            <UserPlus size={20} /> Assigned to me
          </li>
        </ul>
      </nav>

      {/* Add List */}
      <div className="w-full mt-6 p-2 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 text-black">
        <Plus size={20} /> Add list
      </div>

      {/* Today Tasks Section */}
      <div className="w-full bg-white p-4 mt-6 rounded shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Today Tasks</h3>
          <Info size={16} className="text-gray-500" />
        </div>
        <p className="text-2xl font-bold">{pendingTasksCount + completedTasksCount}</p>

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
        <div className="flex justify-center mt-2 space-x-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#4c8c4a] rounded-full"></span> Pending
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#132f15] rounded-full"></span> Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
