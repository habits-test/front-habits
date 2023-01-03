import LoginForm from "../components/auth/LoginForm";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const { updateSigninFormData, signinformData, signin } = useAuthStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signin();
  };

  const loginProps = {
    signinformData,
    handleSubmit,
    updateSigninFormData,
  };

  return <LoginForm {...loginProps} />;
};

export default LoginPage;
