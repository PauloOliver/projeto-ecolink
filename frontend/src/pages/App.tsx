import { Routes, Route, useLocation } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent.tsx";
import { FooterComponent } from "../components/FooterComponent.tsx";
import HomePage from "./HomePage";
import MapPage from "./MapPage.tsx";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import SocialPage from "./SocialPage.tsx";
import UserProfilePage from "./UserProfilePage.tsx";
import UpdateUserForm from "../components/UpdateUserForm.tsx";
import DeleteUserForm from "../components/DeleteUserForm.tsx";

export default function App() {
  const location = useLocation();
  //rotas sem navbar e footer
  const hideLayoutRoutes = ["/social"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!shouldHideLayout && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/update" element={<UpdateUserForm />} />
        <Route path="/delete" element={<DeleteUserForm />} />
      </Routes>
      {!shouldHideLayout && <FooterComponent />}
    </div>
  );
}
