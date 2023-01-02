import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import useAuthStore from "./store/authStore";

function App() {
  const { test, setTest } = useAuthStore();
  useEffect(() => {
    setTest();
  }, []);
  return (
    <>
      <div className="text-xl font-bold text-center">Hello {test}</div>
      <LoginPage />
    </>
  );
}

export default App;
