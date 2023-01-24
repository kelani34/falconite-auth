import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";
import { VerificationPage } from "./pages";
import SignupForm from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

export const VerifyContext = createContext();
function App() {
  const [code, setCode] = useState();
  return (
    <>
      <VerifyContext.Provider value={[code, setCode]}>
        <Routes>
          <Route path="/verify" element={<VerificationPage />} />
          <Route exact path="/sign-up" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </VerifyContext.Provider>
    </>
  );
}

export default App;
