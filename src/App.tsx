import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import EditUser from './Pages/EditUser';

function App() {
  return (
    <>
    {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/:userId/edit" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
