import { useState, useEffect } from 'react'
import TaskManager from './component/TaskManager'
import Header from './component/Header'
import TodoApp from './component/Todo'
import RightSidebar from './component/RightSidebar'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './component/Login'
import { Toaster } from 'react-hot-toast'
import Important from './component/Important'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)
  const [task, setTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  
  // Get dark mode state from Redux
  const isDarkMode = useSelector((state) => state.isDarkMode.isDarkMode);

  // Apply dark mode class based on Redux state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      navigate('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
    <Toaster />
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <div className='w-full h-screen overflow-hidden bg-gray-100 flex flex-col dark:bg-gray-900 dark:text-white'>
              <Header 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <div className='flex w-full h-full overflow-hidden'>
                <TaskManager isOpen={isSidebarOpen} />
                <TodoApp isSidebarOpen={isSidebarOpen} />
                <RightSidebar 
                  task={task} 
                  onClose={() => setTask(null)} 
                  onDelete={() => setTask(null)} 
                />
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/important" 
        element={
          <ProtectedRoute>
            <div className='w-full h-screen overflow-hidden bg-gray-100 flex flex-col dark:bg-gray-900'>
              <Header 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <div className='flex w-full h-full overflow-hidden'>
                <TaskManager isOpen={isSidebarOpen} />
                <Important isSidebarOpen={isSidebarOpen} />
                <RightSidebar 
                  task={task} 
                  onClose={() => setTask(null)} 
                  onDelete={() => setTask(null)} 
                />
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login className="dark:bg-gray-900 " />} />
    </Routes>
    </>
  );
}

export default App
