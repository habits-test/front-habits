import create from "zustand";
import axios from "axios";

type Signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Signin = {
  email: string;
  password: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthState {
  loading: boolean;
  signupformData: Signup;
  signinformData: Signin;
  loggedIn: boolean | null;
  userData: UserData;
  updateSignupFormData: (e: any) => void;
  signup: () => void;
  updateSigninFormData: (e: any) => void;
  signin: () => void;
  checkAuth: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  loading: false,
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
  userData: {
    firstName: "",
    lastName: "",
    email: "",
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

    console.log(signupformData);

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
    set({ loading: true });
    await axios.post("/signin", signinformData);
    set({
      signinformData: {
        email: "",
        password: "",
      },
      loggedIn: null,
      loading: false,
    });
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/check-auth");
      const { firstName, lastName, email } = res.data.user;
      set({ loggedIn: true });
      set((state) => {
        return {
          userData: {
            ...state.userData,
            email,
            firstName,
            lastName,
          },
        };
      });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
  logout: async () => {
    set({ loggedIn: null });
    await axios.get("/logout");
    set({ loggedIn: false });
  },
}));

export default useAuthStore;
