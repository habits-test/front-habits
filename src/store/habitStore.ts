import create from "zustand";
import axios from "axios";
import { Dayjs } from "dayjs";

type Habit = {
  id?: number;
  name: string;
  time: string | Dayjs | null;
};

interface HabitState {
  loading: boolean;
  habits: Habit[];
  getHabits: () => void;
  createHabit: (data: Habit) => void;
}

const useHabitStore = create<HabitState>()((set) => ({
  loading: false,
  habits: [],
  getHabits: async () => {
    set({ loading: true });
    const res = await axios.get("habits");
    set({ habits: res.data.habits, loading: false });
  },
  createHabit: async (data) => {
    const res = await axios.post("habits", data);
  },
}));

export default useHabitStore;
