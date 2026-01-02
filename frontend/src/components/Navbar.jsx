import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  return (<nav className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-[0_4px_20px_rgba(124,58,237,0.1)] border-b border-purple-200">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">          
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-purple-200">
            <span className="text-white text-xl font-bold font-heading tracking-wide">QC</span>
          </div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-violet-700 font-heading">QuickCart</h2>
        </Link>

        {isAuthenticated ? (
          <>              <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`${location.pathname === '/' ? 'text-purple-700 font-medium border-b-2 border-purple-500' : 'text-gray-700 hover:text-purple-600'} transition-all px-2 py-1 font-medium rounded-md`}
            >
              Employees
            </Link>
            <Link
              to="/add"
              className={`${location.pathname === '/add' ? 'text-purple-700 font-medium border-b-2 border-purple-500' : 'text-gray-700 hover:text-purple-600'} transition-all px-2 py-1 font-medium rounded-md`}
            >
              Add Employee
            </Link>
            <Link
              to="/salaries"
              className={`${location.pathname.startsWith('/salar') ? 'text-purple-700 font-medium border-b-2 border-purple-500' : 'text-gray-700 hover:text-purple-600'} transition-all px-2 py-1 font-medium rounded-md`}
            >
              Salary Management
            </Link>                <div className="relative ml-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-200 transition-all"
                id="user-menu-button"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center text-white shadow-lg ring-2 ring-purple-200">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </button>

              {isMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-60 rounded-xl shadow-xl py-1 bg-white ring-1 ring-purple-100 focus:outline-none z-10 animate-fade-in border border-purple-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3 text-sm border-b border-purple-100 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-xl">
                    <p className="font-medium text-purple-800">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>                      <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors rounded-md mx-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Your Profile
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors rounded-md mx-1 mb-1"
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>              {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-purple-700 hover:text-purple-800 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Mobile menu */}
              {isMenuOpen && (
                <div className="absolute top-16 right-0 left-0 bg-white shadow-xl p-4 z-10 animate-fade-in border-t border-purple-100 bg-gradient-to-b from-purple-50 to-white">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/" 
                      className={`${location.pathname === '/' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} px-3 py-3 rounded-lg text-base transition-all flex items-center gap-2`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Employees
                    </Link>
                    <Link
                      to="/add" 
                      className={`${location.pathname === '/add' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} px-3 py-3 rounded-lg text-base transition-all flex items-center gap-2`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Add Employee
                    </Link>
                    <Link
                      to="/salaries" 
                      className={`${location.pathname.startsWith('/salar') ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} px-3 py-3 rounded-lg text-base transition-all flex items-center gap-2`} onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Salary Management
                    </Link>
                    <div className="border-t border-purple-200 pt-4 mt-2">
                      <div className="flex items-center mb-3 bg-gradient-to-r from-purple-50 to-purple-100 p-2 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center text-white mr-3 shadow-md ring-2 ring-purple-200">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-800">{user?.name}</p>
                          <p className="text-xs text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 rounded-lg text-base text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all mb-1 flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg text-base text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className={`${location.pathname === '/login'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                : 'text-gray-700 hover:text-purple-700 bg-white hover:bg-purple-50'} 
                  px-5 py-2 rounded-lg font-medium transition-all border border-transparent hover:border-purple-200`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${location.pathname === '/register'
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                : 'border border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500'} 
                  px-5 py-2 rounded-lg font-medium transition-all`}
            >
              Register
            </Link>
            </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;