import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Components/Join";
import Chat from "./Components/Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
