// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MasterView from "./components/MasterView"; // Import your components for different pages
import AllTestView from "./components/AllTestView"; // Import your components for different pages
import AllTestViewOptimized from "./components/AllTestViewOptimized"; // Import your components for different pages
import Tracker from "./components/Tracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/masterView" element={<MasterView />} />{" "}
        {/* Define routes and their components */}
        <Route path="/allTestView" element={<AllTestView />} />{" "}
        {/* Define routes and their components */}
        <Route path="/optim" element={<AllTestViewOptimized />} />{" "}
        {/* Define routes and their components */}
        <Route path="/" element={<Tracker />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
