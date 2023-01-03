import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/RequireAuth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
