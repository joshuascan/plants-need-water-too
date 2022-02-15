import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
