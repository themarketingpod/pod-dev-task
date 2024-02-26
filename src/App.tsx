import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import EditUser from './Pages/EditUser';
import Sidebar from './Components/Sidebar';
import System from './Pages/System';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <div className={localStorage.getItem("darkMode") === "true" ? "dark" : "light"}>
        <div className="dark:bg-gray-900 dark:text-white">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users/:userId/edit" element={<EditUser />} />
                <Route path="/system" element={<System />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
