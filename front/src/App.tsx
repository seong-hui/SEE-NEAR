import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import FMainPage from "@/pages/family/FMainPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="family" element={<FMainPage />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
