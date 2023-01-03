import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import useAuthStore from "../store/authStore";
import LinearProgress from "@mui/material/LinearProgress";

const LoginPage = () => {
  const { updateSigninFormData, signinformData, signin, loggedIn, checkAuth } =
    useAuthStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signin();
  };

  const loginProps = {
    signinformData,
    handleSubmit,
    updateSigninFormData,
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loggedIn === null) return <LinearProgress />;

  if (loggedIn) return <Navigate to="/" />;

  return <LoginForm {...loginProps} />;
};

export default LoginPage;
