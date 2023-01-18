import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import useAuthStore from "../store/authStore";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    updateSigninFormData,
    signinformData,
    signin,
    loggedIn,
    checkAuth,
    loading,
  } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signin();

    navigate("/");
  };

  const loginProps = {
    signinformData,
    handleSubmit,
    updateSigninFormData,
    loading,
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loggedIn === null) return <LinearProgress />;

  if (loggedIn) return <Navigate to="/" />;

  return <LoginForm {...loginProps} />;
};

export default LoginPage;
