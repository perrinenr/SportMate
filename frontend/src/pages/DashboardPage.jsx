import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard")
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout
      title="Dashboard"
      badge="Live DB"
      actions={<Link to="/matches/create" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Create Match</Link>}
    >
      {loading && <LoadingBox />}
      <ErrorBox message={error} />

      {data && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard label="All Matches" value={data.stats.totalMatches} icon="sports_soccer" />
            <StatCard label="All Teams" value={data.stats.totalTeams} icon="groups" />
            <StatCard label="My Matches" value={data.stats.myMatches} icon="event_available" />
            <StatCard label="My Teams" value={data.stats.myTeams} icon="verified" />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline text-2xl text-primary font-bold">Upcoming Matches</h2>
                <Link to="/matches" className="text-primary font-bold text-sm">View all</Link>
              </div>
              <div className="space-y-4">
                {data.upcomingMatches.length === 0 && <p className="text-stone-500">No matches yet. Create the first match.</p>}
                {data.upcomingMatches.map((match) => (
                  <Link key={match.id} to={`/matches/${match.id}`} className="block bg-surface-container-low rounded-xl p-5 hover:bg-surface-container transition-colors">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-headline text-lg font-bold text-primary">{match.title}</h3>
                        <p className="text-sm text-on-surface-variant">{match.sportName} • {match.cityName} • {new Date(match.matchDate).toLocaleString()}</p>
                      </div>
                      <span className="text-xs font-bold bg-white rounded-full px-3 py-1 h-fit">{match.participantsCount}/{match.requiredPlayers}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-xl p-8 text-white shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
              <h2 className="font-headline text-2xl font-bold mb-2">Hello {data.user.firstName}</h2>
              <p className="text-blue-100/90 mb-6">Your profile is dynamic. Update your phone, city, image, and bio from the Profile page.</p>
              <div className="space-y-3 text-sm">
                <p><span className="font-bold">Email:</span> {data.user.email}</p>
                <p><span className="font-bold">City:</span> {data.user.cityName || "Not set"}</p>
                <p><span className="font-bold">Phone:</span> {data.user.phone || "Not set"}</p>
              </div>
              <Link to="/profile/edit" className="mt-8 inline-block bg-white text-primary px-4 py-2 rounded-lg font-bold">Edit Profile</Link>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-2xl text-primary font-bold">Recent Teams</h2>
              <Link to="/teams" className="text-primary font-bold text-sm">View all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data.recentTeams.length === 0 && <p className="text-stone-500">No teams yet.</p>}
              {data.recentTeams.map((team) => (
                <Link key={team.id} to={`/teams/${team.id}`} className="bg-surface-container-low rounded-xl p-5 hover:bg-surface-container transition-colors">
                  <h3 className="font-headline font-bold text-primary">{team.name}</h3>
                  <p className="text-sm text-on-surface-variant">{team.sportName} • {team.cityName}</p>
                  <p className="text-xs mt-4 font-bold">{team.membersCount}/{team.requiredPlayers} members</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </AppLayout>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</p>
        <p className="font-headline text-4xl font-black text-primary mt-2">{value}</p>
      </div>
      <span className="material-symbols-outlined text-4xl text-primary/30">{icon}</span>
    </div>
  );
}
