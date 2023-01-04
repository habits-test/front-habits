import create from "zustand";
import axios from "axios";

type Habit = {
  id?: number;
  name: string;
  time: string;
};

interface HabitState {
  loading: boolean;
  habits: Habit[];
  habitForm: Habit;
  getHabits: () => void;
  createHabit: () => void;
  updateHabitForm: (e: any) => void;
}

const useHabitStore = create<HabitState>()((set) => ({
  loading: true,
  habits: [],
  habitForm: {
    id: -1,
    name: "",
    time: "",
  },
  getHabits: async () => {
    const res = await axios.get("habits");
    set({ habits: res.data.habits, loading: false });
  },
  createHabit: () => {
    const { habitForm } = useHabitStore.getState();

    console.log(habitForm);
  },

  updateHabitForm: (e: any) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        habitForm: {
          ...state.habitForm,
          [name]: value,
        },
      };
    });
  },
}));

export default useHabitStore;
