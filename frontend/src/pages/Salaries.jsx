import React, { useState, useEffect } from "react";
import { getAllSalaries, approveSalary, generateSalaryReport, generateSingleSalaryPDF } from "../api/salaryApi.js";
import { Link } from "react-router-dom";
import SalaryList from "../components/SalaryList.jsx";
import { downloadPDF, openPDFInNewTab } from "../utils/pdfUtils.js";
import { toast, Toaster } from "react-hot-toast";

const Salaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const { data } = await getAllSalaries();
      setSalaries(data);
    } catch (err) {
      setError("Failed to load salaries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this salary?")) {
      try {
        await approveSalary(id);
        fetchSalaries();
      } catch (err) {
        setError("Failed to approve salary");
        console.error(err);
      }
    }
  };

  const handleGenerateReport = async () => {
    const loadingToast = toast.loading(`Generating salary report for ${months.find(m => m.value == month)?.label} ${year}...`, {
      style: {
        background: '#F3E8FF',
        color: '#4C1D95',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#7C3AED',
        secondary: '#FFFFFF',
      },
    });

    try {
      setPdfGenerating(true);
      console.log(`Generating report for ${month}/${year}...`);

      const response = await generateSalaryReport(month, year);
      console.log('API response:', response);

      const { data } = response;

      if (!data || !data.downloadUrl) {
        throw new Error('Download URL not found in response');
      }
      
      // Store the URL for viewing in browser option
      setReportUrl(data.downloadUrl);
      console.log('Report URL set to:', data.downloadUrl);
      
      // Default action: download the report
      const downloadResult = downloadPDF(data.downloadUrl, `Salary_Report_${month}_${year}.pdf`);
      
      if (downloadResult) {
        // Show success message with toast instead of alert
        toast.success('Report generated and downloaded successfully!', {
          id: loadingToast,
          duration: 5000,
          style: {
            background: '#F0FDF4',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
          },
        });
      } else {
        toast.success('Report generated successfully!', {
          id: loadingToast,
          duration: 5000,
          style: {
            background: '#F0FDF4',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
          },
        });
        toast('Click "View Report in Browser" to view the report', {
          icon: '👆',
          duration: 5000,
        });
      }
    } catch (err) {
      setError("Failed to generate report");
      console.error("Generate Report Error:", err);
      toast.error(`Failed to generate report: ${err.message}`, {
        id: loadingToast,
        duration: 5000,
        style: {
          background: '#FEF2F2',
          color: '#B91C1C',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    } finally {
      setPdfGenerating(false);
    }
  }; const handleGenerateSinglePDF = async (id, employeeName) => {
    const loadingToast = toast.loading(`Generating salary PDF for ${employeeName}...`, {
      style: {
        background: '#F3E8FF',
        color: '#4C1D95',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#7C3AED',
        secondary: '#FFFFFF',
      },
    });

    try {
      setPdfGenerating(true);
      console.log(`Generating PDF for employee: ${employeeName}, ID: ${id}`);

      const response = await generateSingleSalaryPDF(id);
      console.log('Single PDF API response:', response);

      const { data } = response;

      if (!data || !data.downloadUrl) {
        throw new Error('Download URL not found in response');
      }
      
      // Update the salaries list to include the download URL
      setSalaries(prev => 
        prev.map(salary => 
          salary._id === id 
            ? { ...salary, downloadUrl: data.downloadUrl } 
            : salary
        )
      );
      
      // Default action: download
      const downloadResult = downloadPDF(
        data.downloadUrl, 
        `Salary_${employeeName.replace(/\s+/g, '_')}.pdf`
      );
      
      if (downloadResult) {
        // Success message with toast instead of alert
        toast.success(`PDF for ${employeeName}'s salary generated and downloaded successfully!`, {
          id: loadingToast,
          duration: 5000,
          style: {
            background: '#F0FDF4',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
          },
        });
      } else {
        // Use toast for notification
        toast.success(`PDF for ${employeeName}'s salary generated successfully!`, {
          id: loadingToast,
          duration: 5000,
          style: {
            background: '#F0FDF4',
            color: '#166534',
            padding: '16px',
            borderRadius: '8px',
          },
        });

        // Add action button to view the PDF
        setTimeout(() => {
          toast((t) => (
            <div className="flex flex-col">
              <span>Click to view the PDF in browser</span>
              <button
                onClick={() => {
                  openPDFInNewTab(data.downloadUrl);
                  toast.dismiss(t.id);
                }}
                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                View PDF
              </button>
            </div>
          ), { duration: 8000 });
        }, 1000);
      }
    } catch (err) {
      setError(`Failed to generate PDF for ${employeeName}: ${err.message}`);
      console.error(`Generate PDF Error for ${employeeName}:`, err);
      toast.error(`Failed to generate PDF for ${employeeName}: ${err.message}`, {
        id: loadingToast,
        duration: 5000,
        style: {
          background: '#FEF2F2',
          color: '#B91C1C',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    } finally {
      setPdfGenerating(false);
    }
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];

  // Generate array of years from 2020 to current year + 1
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add Toaster for notifications */}
      <Toaster position="top-right" />

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">          <div>
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Salary Management
            </span>
          </h1>
            <p className="text-gray-600 mt-1">Manage and track employee salaries</p>
        </div><Link 
            to="/add-salary" 
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Calculate New Salary
          </Link>
        </div>
      </div>
      
      <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search & Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Employee</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>              <input
                id="search"
                type="text"
                placeholder="Search by employee name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">          <button
            onClick={handleGenerateReport}
            disabled={pdfGenerating}
          className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ${pdfGenerating ? 'opacity-60 cursor-not-allowed' : 'shadow-sm'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {pdfGenerating ? 'Generating...' : 'Generate Report'}
          </button>
          
          {reportUrl && (
            <button
              onClick={() => openPDFInNewTab(reportUrl)}
              className="inline-flex items-center px-4 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View Report in Browser
            </button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <SalaryList 
          salaries={salaries} 
          onApprove={handleApprove}
          onGeneratePDF={handleGenerateSinglePDF}
          searchTerm={search} 
        />
      )}
    </div>
  );
};

export default Salaries;
