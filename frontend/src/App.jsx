import React from "react";
import { Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import EmployeeDetail from "./pages/EmployeeDetail.jsx";
import Salaries from "./pages/Salaries.jsx";
import AddSalary from "./pages/AddSalary.jsx";
import EditSalary from "./pages/EditSalary.jsx";
import SalaryDetail from "./pages/SalaryDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ApiStatus from "./components/ApiStatus.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PrivateRoute, PublicOnlyRoute } from "./components/RouteProtection.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />

        <div className="py-6">
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              }
            />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
            {/* Employee Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <AddEmployee />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditEmployee />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/:id"
              element={
                <PrivateRoute>
                  <EmployeeDetail />
                </PrivateRoute>
              }
            />

            {/* Salary Routes */}
            <Route
              path="/salaries"
              element={
                <PrivateRoute>
                  <Salaries />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-salary"
              element={
                <PrivateRoute>
                  <AddSalary />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-salary/:id"
              element={
                <PrivateRoute>
                  <EditSalary />
                </PrivateRoute>
              }
            />
            <Route
              path="/salary/:id"
              element={
                <PrivateRoute>
                  <SalaryDetail />
                </PrivateRoute>
              }
            />
          </Routes>        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
