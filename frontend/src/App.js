import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import MatchesPage from "./pages/MatchesPage";
import CreateMatchPage from "./pages/CreateMatchPage";
import MatchDetailsPage from "./pages/MatchDetailsPage";
import TeamsPage from "./pages/TeamsPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./components/RequireAuth";

function Protected({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />

      <Route path="/matches" element={<Protected><MatchesPage /></Protected>} />
      <Route path="/matches/create" element={<Protected><CreateMatchPage /></Protected>} />
      <Route path="/matches/:id" element={<Protected><MatchDetailsPage /></Protected>} />
      <Route path="/matches/details" element={<Navigate to="/matches" replace />} />

      <Route path="/teams" element={<Protected><TeamsPage /></Protected>} />
      <Route path="/teams/create" element={<Protected><CreateTeamPage /></Protected>} />
      <Route path="/teams/:id" element={<Protected><TeamDetailsPage /></Protected>} />
      <Route path="/teams/details" element={<Navigate to="/teams" replace />} />

      <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
      <Route path="/profile/edit" element={<Protected><EditProfilePage /></Protected>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
