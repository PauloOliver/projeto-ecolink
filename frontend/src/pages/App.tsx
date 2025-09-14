
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar.tsx";
import { FooterComponent } from "../components/Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <NavigationBar/>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <FooterComponent/>
    </div>
  );
}
