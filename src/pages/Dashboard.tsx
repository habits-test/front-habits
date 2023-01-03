import { useEffect } from "react";
import useAppStore from "../store/appStore";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { test, setTest } = useAppStore();
  const { loggedIn } = useAuthStore();
  useEffect(() => {
    setTest();
  }, []);
  return (
    <div>
      {" "}
      <div className="text-xl font-bold text-center">Dashboard - {test}</div>
      <div className="text-xl font-bold text-center">
        Status : {loggedIn ? "Logged in" : "Logged out"}
      </div>
    </div>
  );
};

export default Dashboard;
