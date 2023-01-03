import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { test, setTest } = useAuthStore();
  useEffect(() => {
    setTest();
  }, []);
  return (
    <div>
      {" "}
      <div className="text-xl font-bold text-center">
        Dashboard -Hello {test}
      </div>
    </div>
  );
};

export default Dashboard;
