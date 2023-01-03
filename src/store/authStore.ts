import create from 'zustand'
import axios from "axios";

type Signup =  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Signin = {
  email: string;
  password: string;
}

interface AuthState {
  signupformData: Signup,
  signinformData: Signin,
  loggedIn: boolean | null,
  updateSignupFormData: (e: any) => void,
  signup: () => void,
  updateSigninFormData: (e: any) => void,
  signin: () => void,
  checkAuth: () => void
}

const useAuthStore = create<AuthState>()((set) => ({
  signupformData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  signinformData: {
    email: "",
    password: "",
  },
  loggedIn: null,
  updateSignupFormData: (e: any) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupformData: {
          ...state.signupformData,
          [name]: value,
        },
      };
    });
  },
  signup: async () => {
    const { signupformData } = useAuthStore.getState();
    
    console.log(signupformData)

    await axios.post("/signup", signupformData);
    set({
      signupformData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    });
  },
  updateSigninFormData: (e: any) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signinformData: {
          ...state.signinformData,
          [name]: value,
        },
      };
    });
  },
  signin: async () => {
    const { signinformData } = useAuthStore.getState();
    await axios.post("/signin", signinformData);
    set({
      signinformData: {
        email: "",
        password: "",
      },
    });
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
})
)

export default useAuthStore;