import { useEffect } from "react";
import Calendars from "../components/Calendars";
import User from "../components/User";
import useAuthStore from "../store/authStore";
import useHabitStore from "../store/habitStore";

const Dashboard = () => {
  const {
    getHabits,
    habits,
    loading,
    createHabit,
    habitForm,
    updateHabitForm,
  } = useHabitStore();
  const { userData } = useAuthStore();
  useEffect(() => {
    getHabits();
  }, []);

  const calendarsProps = {
    habits,
    loading,
    createHabit,
    habitForm,
    updateHabitForm,
  };

  return (
    <div>
      {/* <User test={test} userData={userData} /> */}
      <Calendars {...calendarsProps} />
    </div>
  );
};

export default Dashboard;
