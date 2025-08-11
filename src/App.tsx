import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import DriverPage from "./pages/DriverPage";
import DriverApproval from "./pages/DriverApproval";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to="/user-management" replace />}
          />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/drivers" element={<UserManagement />} />
          <Route path="/drivers/:id" element={<DriverPage />} />
          <Route path="/driver-approval/:id" element={<DriverApproval />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
