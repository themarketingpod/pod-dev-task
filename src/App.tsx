import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import EditUser from './Pages/EditUser';
import Sidebar from './Components/Sidebar';
import System from './Pages/System';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
