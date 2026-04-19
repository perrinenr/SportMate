import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import MatchesPage from "./pages/MatchesPage";
import CreateMatchPage from "./pages/CreateMatchPage";
import TeamsPage from "./pages/TeamsPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import TeamDetailsPage from "./pages/TeamDetailsPage";

// ajoute ces 2 imports
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <Routes>
      {/* page par défaut */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* app */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/matches/create" element={<CreateMatchPage />} />
      <Route path="/matches/details" element={<MatchDetailsPage />} />

      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/create" element={<CreateTeamPage />} />
      <Route path="/teams/details" element={<TeamDetailsPage />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />

      {/* si route inconnue */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}