import create from 'zustand'
import axios from "axios";

interface AppState {
    test: string | null,
    setTest: () => void

}

const useAppStore = create<AppState>()((set) => ({
  test: null,
  setTest: async () => {
    const res = await axios.get("/");
    set({
        test: res.data.hello
    })
  }
})
)

export default useAppStore;