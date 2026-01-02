/**
 * Utility to trigger a direct download of a PDF file
 * @param {string} url - The URL path of the file to download
 * @param {string} filename - The filename to save as
 */
export const downloadPDF = (url, filename) => {
  try {
    if (!url) {
      console.error('Download URL is empty or undefined');
      throw new Error('Invalid download URL');
    }

    // Create an invisible anchor element
    const a = document.createElement('a');
    a.style.display = 'none';

    // Properly format the URL
    const completeUrl = url.startsWith('http')
      ? url
      : `${import.meta.env.VITE_API_URL}${url}`;

    console.log('Downloading PDF from URL:', completeUrl);

    a.href = completeUrl;
    a.setAttribute('download', filename || 'document.pdf');

    // Append to the document and trigger click
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);

    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return false;
  }
};

/**
 * Opens a PDF in a new browser tab
 * @param {string} url - The URL path of the file to open
 */
export const openPDFInNewTab = (url) => {
  try {
    if (!url) {
      console.error('View URL is empty or undefined');
      throw new Error('Invalid view URL');
    }

    // Properly format the URL
    const completeUrl = url.startsWith('http')
      ? url
      : `${import.meta.env.VITE_API_URL}${url}`;

    console.log('Opening PDF in new tab:', completeUrl);

    window.open(completeUrl, '_blank');
    return true;
  } catch (error) {
    console.error('Error opening PDF in new tab:', error);
    return false;
  }
};

/**
 * Creates a formatted filename for salary PDFs
 * @param {Object} salary - Salary object containing employeeId, month, year
 * @returns {string} Formatted filename
 */
export const formatSalaryFilename = (salary) => {
  if (!salary) return 'salary.pdf';
  
  // Handle potentially missing employeeId
  const employeeName = salary.employeeId && salary.employeeId.name 
    ? salary.employeeId.name.replace(/\s+/g, '_') 
    : 'unknown_employee';
    
  return `Salary_${employeeName}_${salary.month}_${salary.year}.pdf`;
};
