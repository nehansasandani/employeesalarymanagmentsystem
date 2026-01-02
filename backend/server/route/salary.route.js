import express from 'express';
import {
    calculateSalary,
    getAllSalaries,
    getSalaryById,
    getSalariesByEmployee,
    updateSalary,
    approveSalary,
    approveAttendance,
    generateSalaryReport,
    generateSingleSalaryPDF
} from '../controllers/salary.controller.js';

const router = express.Router();

// Calculate salary for an employee
router.post('/calculate/:id', calculateSalary);

// Get all salaries
router.get('/', getAllSalaries);

// Generate salary report - must be before /:id to avoid conflict
router.get('/report', generateSalaryReport);

// Generate PDF for a single salary - must be before /:id to avoid conflict
router.get('/pdf/:id', generateSingleSalaryPDF);

// Get all salaries for a specific employee
router.get('/employee/:employeeId', getSalariesByEmployee);

// Update salary
router.put('/update/:id', updateSalary);

// Approve salary
router.put('/approve/:id', approveSalary);

// Approve attendance status
router.put('/approve-attendance/:id', approveAttendance);

// Get salary by ID (this should be last as it's a catch-all for IDs)
router.get('/:id', getSalaryById);

export default router;
