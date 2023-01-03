import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import SignupForm from "../components/auth/SignupForm";
import LinearProgress from "@mui/material/LinearProgress";

const SignupPage = () => {
  const { updateSignupFormData, signupformData, signup, loggedIn, checkAuth } =
    useAuthStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup();
  };

  const SignupProps = {
    updateSignupFormData,
    signupformData,
    handleSubmit,
  };

  useEffect(() => {
    checkAuth();
  }, []);
  if (loggedIn === null) return <LinearProgress />;

  if (loggedIn) return <Navigate to="/" />;
  return <SignupForm {...SignupProps} />;
};

export default SignupPage;
