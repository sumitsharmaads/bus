import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import User from "../../utils/User";

export const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);
  useEffect(() => {
    setLoading(true);
    const handleTime = () => {
      setToken(() => (User.isLogin && User.isAdmin ? true : false));
      setLoading(false);
    };
    setTimeout(() => handleTime(), 200);
  }, []);

  if (loading) return null;
  return token ? <>{children}</> : <Navigate to="/" replace />;
};
