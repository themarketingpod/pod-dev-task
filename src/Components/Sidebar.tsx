import { Link } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        className="fixed top-0 left-0 w-16 h-16 bg-gray-700 text-white flex items-center justify-center focus:outline-none z-10"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
      {/* Sidebar */}
      <div className={`fixed bottom-0 left-0 bg-gray-800 text-white flex flex-col items-center h-full overflow-hidden transition-all duration-300 ${isOpen ? 'w-16' : 'w-0'}`}>
        <div className="mt-8">
          <div className="mb-4">
            {/* Link to the dashboard */}
            <Link to="/" className="text-2xl text-white hover:text-gray-300 focus:outline-none">
              <img src="../../public/Assets/home-icon.png" alt="Home icon" className="w-8 h-8 mx-auto mt-10" />
            </Link>
          </div>
          <div className="mb-4">
            <button className="text-2xl text-white hover:text-gray-300 focus:outline-none">
                {/* Mystery Link */}
                <Link to="https://youtu.be/uOa-ObWPAKg?si=IK6OrHMiYYiHPcOo">
                    <img src="../../public/Assets/help-icon.png" alt="Help icon" className="w-8 h-8 mx-auto" />
                </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
