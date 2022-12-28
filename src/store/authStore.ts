import create from 'zustand'
import axios from "axios";

interface AuthState {
    test: string | null,
    setTest: () => void

}

const useAuthStore = create<AuthState>()((set) => ({
  test: null,
  setTest: async () => {
    const res = await axios.get("/");
    set({
        test: res.data.hello
    })
  }
})
)

export default useAuthStore;