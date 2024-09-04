import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login10 from "../login-form-20";
import AllTestView from "./components/AllTestView";
import Datagrid from "./components/Datagrid"
import MasterView from "./components/MasterView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login10 />}></Route>
        <Route path="/tracker" element={<MasterView />}></Route>
        <Route path="/glrTracker" element={<Datagrid />} />
      </Routes>
    </Router>
  );
}

export default App;
