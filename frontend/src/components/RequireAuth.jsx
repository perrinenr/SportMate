import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function RequireAuth({ children }) {
  const user = getCurrentUser();
  if (!user?.id) return <Navigate to="/login" replace />;
  return children;
}
