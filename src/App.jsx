import { useState, useEffect } from 'react'
import TaskManager from './component/TaskManager'
import Header from './component/Header'
import TodoApp from './component/Todo'
import RightSidebar from './component/RightSidebar'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './component/Login'
import { Toaster } from 'react-hot-toast'
import Important from './component/Important'


function App() {
  const [count, setCount] = useState(0)
  const [task, setTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
            <div className='w-full h-screen overflow-hidden bg-gray-100 flex flex-col'>
              <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
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
            <div className='w-full h-screen overflow-hidden bg-gray-100 flex flex-col'>
              <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
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
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App
