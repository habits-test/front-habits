import useAuthStore from "../store/authStore";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  const { updateSignupFormData, signupformData, signup } = useAuthStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup();
  };

  const SignupProps = {
    updateSignupFormData,
    signupformData,
    handleSubmit,
  };

  return <SignupForm {...SignupProps} />;
};

export default SignupPage;
