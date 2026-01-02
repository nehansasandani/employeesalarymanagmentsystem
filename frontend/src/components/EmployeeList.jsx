import React from "react";
import { Link } from "react-router-dom";

const EmployeeList = ({ employees, onDelete, searchTerm }) => {
  const filteredEmployees = searchTerm
    ? employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : employees;

  return (<div className="overflow-x-auto rounded-xl shadow-lg border border-purple-100">
    <table className="min-w-full bg-white rounded-xl">
      <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
          <tr>
          <th className="py-4 px-6 text-left text-purple-800 font-semibold">Employee Name</th>
          <th className="py-4 px-6 text-left text-purple-800 font-semibold">Position</th>
          <th className="py-4 px-6 text-left text-purple-800 font-semibold">Basic Salary</th>
          <th className="py-4 px-6 text-left text-purple-800 font-semibold">Status</th>
          <th className="py-4 px-6 text-left text-purple-800 font-semibold">Actions</th>
          </tr>
      </thead>        <tbody>
          {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp, index) => (
            <tr key={emp._id} className={`border-b transition-colors hover:bg-purple-50 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'}`}>
              <td className="py-4 px-6 font-medium text-gray-800">{emp.name}</td>
              <td className="py-4 px-6 text-gray-700">{emp.position}</td>
              <td className="py-4 px-6 text-gray-700">${emp.salary.toLocaleString()}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-800 ring-1 ring-green-300' : 'bg-red-100 text-red-800 ring-1 ring-red-300'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="py-4 px-6 flex flex-wrap gap-2">
                  <Link
                    to={`/employee/${emp._id}`}
                    className="px-3 py-1.5 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </Link>
                  <Link
                    to={`/edit/${emp._id}`}
                    className="px-3 py-1.5 text-xs bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <button 
                    onClick={() => onDelete(emp._id)}
                    className="px-3 py-1.5 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500 bg-purple-50/30">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">No employees found</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;