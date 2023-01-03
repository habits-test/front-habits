import Header from "../components/Header";
import useAuthStore from "../store/authStore";

const HeaderPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = (): void => {
    logout();
  };
  return <Header handleLogout={handleLogout} />;
};

export default HeaderPage;
