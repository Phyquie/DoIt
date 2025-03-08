import React, { useState, useEffect } from "react";
import { Bell, RotateCw, Grid2x2, Star , Trash2 ,ListCheck} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addTask,updateTask ,deleteTask} from "../redux/taskSlice";
import toast from "react-hot-toast";

const TodoApp = ({ isSidebarOpen }) => {
  const [newTaskText, setNewTaskText] = useState("");
  const isGridView = useSelector((state) => state.isDarkMode.isGridView);
  const tasks = useSelector((state) => state.tasks.tasks.filter((task) => task.userId === localStorage.getItem('userId') && task.status === false
&& task.date === new Date().toISOString()),[localStorage.getItem('userId')]);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      dispatch(addTask({
        id: Date.now(),
        text : newTaskText,
        priority : false,
        userId : localStorage.getItem('userId'),
        status : false,
        date : new Date().toISOString(),
      }));
      setNewTaskText("");
      toast.success("Task added successfully");
    }
  };
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
  };

  

  const handleCompleteTask = (id) => {
    dispatch(updateTask({ id, status: true }));
  };

  const handleImportantTask = (id) => {
    dispatch(updateTask({ id, important: true }));
  };

  const handleUnimportantTask = (id) => {
    dispatch(updateTask({ id, important: false }));
  };
  
  const completedTasks = useSelector((state) => state.tasks.tasks.filter((task) => 
    task.status === true && task.userId === localStorage.getItem('userId')
   && task.date === new Date().toISOString()),[localStorage.getItem('userId')]);
  return (
    <div className="grow bg-white dark:text-white dark:bg-gray-800">
      <div className={`grow p-6 bg-white shadow transition-transform duration-300 dark:bg-gray-800`}>
        <h2 className="text-gray-700 dark:text-white">Today Tasks</h2>
        <div className="p-4 bg-green-50 rounded-md flex h-56 flex-col justify-items-start">
          <input 
            type="text" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a task" 
            className="w-full p-2 rounded-md border h-full flex-grow bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white" 
          />
          <div className="flex items-center gap-4 mt-3">
            <Bell className="text-gray-600 cursor-pointer" />
            <RotateCw className="text-gray-600 cursor-pointer" onClick={() => setNewTaskText("")} />
            <Grid2x2 
              className={`cursor-pointer ${isGridView ? 'text-green-600' : 'text-gray-600'}`}
              onClick={() => setIsGridView(!isGridView)}
            />
            <button onClick={handleAddTask} className="bg-green-200 px-4 py-1 rounded text-green-800">
              Add Task
            </button>
          </div>
        </div>
        
        <div className={`mt-4 ${isGridView ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : ''}`}>
          {tasks.map((task) => (
            <div key={task.id} className={`${isGridView ? 'bg-white dark:bg-gray-700 p-4 rounded-lg shadow' : 'border-b py-2'}`}>
              <div className={`flex ${isGridView ? 'flex-col gap-3' : 'justify-between items-center'}`}>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="cursor-pointer" onChange={() => handleCompleteTask(task.id)} />
                  <span>{task.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trash2 className="cursor-pointer" onClick={() => handleDeleteTask(task.id)} />
                  <Star className={`cursor-pointer ${task.important ? "fill-black" : "text-gray-500"}`} onClick={() => 
                    task.important ? handleUnimportantTask(task.id) : handleImportantTask(task.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-gray-600">Completed</h3>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={task.id} className="flex justify-between items-center gap-2 text-gray-400 line-through py-1">
              
                ✅ {task.text} 
                <Trash2 className="cursor-pointer text-gray-400" onClick={() => handleDeleteTask(task.id)} />
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
