import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import FMainPage from "@/pages/family/FMainPage";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import FSettingPage from "@/pages/family/FSettingPage";
import WeeklyAnalysisPage from "@/pages/family/WeeklyAnalysisPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="family/main" element={<FMainPage />} />
        <Route path="family/setting" element={<FSettingPage />} />
        <Route path="family/setting" element={<FSettingPage />} />
        <Route path="family/analyze" element={<WeeklyAnalysisPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
