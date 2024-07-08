import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Login10 from "../login-form-20";
import AllTestView from "./components/AllTestView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login10 />}></Route>
        <Route path="/tracker" element={<AllTestView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
