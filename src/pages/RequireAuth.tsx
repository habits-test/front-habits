import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import LinearProgress from "@mui/material/LinearProgress";

type RequireAuthProps = {
  children?: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { loggedIn, checkAuth } = useAuthStore();

  useEffect(() => {
    if (loggedIn === null) {
      checkAuth();
    }
  }, []);

  if (loggedIn === null) return <LinearProgress />;

  if (loggedIn === false) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default RequireAuth;
