import { useEffect } from "react";
import useAuthStore from "./store/authStore";

function App() {
  const store = useAuthStore();
  useEffect(() => {
    store.setTest();
  }, []);
  return <div>Hello {store.test}</div>;
}

export default App;
