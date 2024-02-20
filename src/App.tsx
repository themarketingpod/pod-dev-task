import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import EditUser from './Pages/EditUser';

function App() {
  return (
    <>
    {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/users/:userId/edit" element={<EditUser />} />
      </Routes>
      <section className="p-8">
        <div className="w-full max-w-screen-xl m-auto">
          <h1 className="font-bold text-center text-4xl">Pod Dev Task</h1>
        </div>
      </section>
    </>
  );
}

export default App;
