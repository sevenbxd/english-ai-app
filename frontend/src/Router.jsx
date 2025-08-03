import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";

const isLoggedIn = () => {
  return !!localStorage.getItem("username");
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn() ? <App /> : <Navigate to="/auth" replace />
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
