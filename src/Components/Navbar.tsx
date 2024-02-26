import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

const switchMode = () => {
    setDarkMode(!darkMode);
}

useEffect(() => {
    if (darkMode) {
        localStorage.setItem("darkMode", "true");
        document.documentElement.classList.add("dark");
    } else if (!darkMode) {
        localStorage.setItem("darkMode", "false");
        document.documentElement.classList.remove("dark");
    } else {
        setDarkMode(localStorage.getItem("darkMode") === "true");
    }
}, [darkMode]);

  return (
    <nav className="bg-gray-700 text-white w-full fixed top-0 left-0 px-6 py-4 flex justify-between items-center h-[64px] z-20">
      {/* Empty div to balance the flex space */}
      <div className="w-[16px]"></div>
      <div>
        <Link to="/" className="no-underline">
            <h1 className="text-center flex-grow text-white">Cat Caller</h1>
        </Link>
      </div>
      {/* Button stays to the right */}
      <button onClick={switchMode} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
        {darkMode === true ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="white" d="M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3"/></svg> : 
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="white" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6M5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/></svg>}
      </button>
    </nav>
  );
}
