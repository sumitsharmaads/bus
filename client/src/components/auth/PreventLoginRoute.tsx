import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import User from "../../utils/User";

interface PreventLoginRouteProps {
  element: ReactNode;
}

export const PreventLoginRoute: React.FC<PreventLoginRouteProps> = ({
  element,
}) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);
  useEffect(() => {
    setLoading(true);
    setToken(() => (User.isLogin ? true : false));
    setLoading(false);
  }, []);

  if (loading) return null;
  return token ? <Navigate to="/" replace /> : <>{element}</>;
};
