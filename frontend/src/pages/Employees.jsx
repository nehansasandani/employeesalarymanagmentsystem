import React, { useState, useEffect } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi.js";
import { Link } from "react-router-dom";
import EmployeeList from "../components/EmployeeList.jsx";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to load employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError("Failed to delete employee");
        console.error(err);
      }
    }
  };

  return (<div className="container mx-auto px-4 py-10">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-violet-700 font-heading">
        Employees
      </h1>
        <Link 
          to="/add" 
        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
          Add Employee
        </Link>
      </div>
    <div className="mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search employees by name, position, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 pl-12 border-2 border-purple-100 rounded-xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-100 focus:ring-opacity-30 transition-all duration-200 shadow-sm"
        />
      </div>
    </div>
      
      {loading ? (
      <div className="text-center py-12 flex flex-col items-center">
        <svg className="animate-spin h-10 w-10 text-purple-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-purple-700 font-medium">Loading employees...</span>
      </div>
      ) : error ? (
        <div className="text-center py-8 bg-red-50 border-l-4 border-red-500 p-5 rounded-lg">
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </div>
      ) : (
        <EmployeeList 
          employees={employees} 
          onDelete={handleDelete} 
          searchTerm={search} 
        />
      )}
    </div>
  );
};

export default Employees;