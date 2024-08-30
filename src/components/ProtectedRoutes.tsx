import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoutes: React.FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      return;
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
