import { useEffect } from "react";
import Calendars from "../components/Calendars";
import User from "../components/User";
import useAuthStore from "../store/authStore";
import useHabitStore from "../store/habitStore";

const Dashboard = () => {
  const { getHabits, habits, loading, createHabit } = useHabitStore();
  const { userData } = useAuthStore();
  useEffect(() => {
    getHabits();
  }, []);

  const calendarsProps = {
    habits,
    loading,
    createHabit,
  };

  return (
    <div>
      {/* <User userData={userData} /> */}
      <Calendars {...calendarsProps} />
    </div>
  );
};

export default Dashboard;
