import { Routes, Route } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent.tsx";
import { FooterComponent } from "../components/FooterComponent.tsx";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import SocialPage from "./SocialPage.tsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/social" element={<SocialPage />} />
        </Routes>
      <FooterComponent/>
    </div>
  );
}



