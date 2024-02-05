import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

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
