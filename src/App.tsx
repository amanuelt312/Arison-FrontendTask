import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import DriverPage from "./pages/DriverPage";
import DriverApproval from "./pages/DriverApproval";
import RequireAuth from "./components/auth/RequireAuth";
import { useAuthRefresh } from "./hooks/useAuthRefresh";

function App() {
  useAuthRefresh();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to="/user-management" replace />}
          />

          <Route
            path="/user-management"
            element={
              <RequireAuth>
                <UserManagement />
              </RequireAuth>
            }
          />
          <Route
            path="/drivers"
            element={
              <RequireAuth>
                <UserManagement />
              </RequireAuth>
            }
          />
          <Route
            path="/drivers/:id"
            element={
              <RequireAuth>
                <DriverPage />
              </RequireAuth>
            }
          />
          <Route
            path="/driver-approval/:id"
            element={
              <RequireAuth>
                <DriverApproval />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
