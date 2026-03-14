import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const data = JSON.parse(localStorage.getItem("user"));

  if (!data?.token) return <Navigate to="/login" replace />;
  return children;
}
