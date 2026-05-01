import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { EmptyBox, ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({ sportId: "", cityId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.sportId) params.append("sportId", filters.sportId);
    if (filters.cityId) params.append("cityId", filters.cityId);
    return params.toString() ? `?${params.toString()}` : "";
  }, [filters]);

  useEffect(() => {
    Promise.all([api.get("/sports"), api.get("/cities")])
      .then(([sportData, cityData]) => { setSports(sportData); setCities(cityData); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    api.get(`/teams${query}`)
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <AppLayout
      title="Teams"
      badge={`${teams.length} loaded`}
      actions={<Link to="/teams/create" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Create Team</Link>}
    >
      <section className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select label="Sport" value={filters.sportId} onChange={(value) => setFilters((p) => ({ ...p, sportId: value }))} options={sports} />
        <Select label="City" value={filters.cityId} onChange={(value) => setFilters((p) => ({ ...p, cityId: value }))} options={cities} />
        <button onClick={() => setFilters({ sportId: "", cityId: "" })} className="self-end bg-surface-container-low rounded-xl px-4 py-3 font-bold text-primary">Reset filters</button>
      </section>

      {loading && <LoadingBox />}
      <ErrorBox message={error} />
      {!loading && !error && teams.length === 0 && <EmptyBox text="No teams found. Create a team to add data." />}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <article key={team.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${team.isFull ? "bg-error-container text-error" : "bg-tertiary-fixed-dim/20 text-on-tertiary-fixed"}`}>
                {team.isFull ? "Full" : "Open"}
              </span>
            </div>

            <h3 className="text-xl font-headline font-bold text-primary mb-2">{team.name}</h3>
            <p className="text-sm text-on-surface-variant mb-5 line-clamp-2">{team.description || "No description provided."}</p>

            <div className="space-y-2 text-sm text-on-surface-variant mb-6">
              <Info icon="sports" text={team.sportName} />
              <Info icon="location_on" text={team.cityName} />
              <Info icon="groups" text={`${team.membersCount}/${team.requiredPlayers} members`} />
              <Info icon="person" text={`Created by ${team.creatorName}`} />
            </div>

            <div className="flex gap-3">
              <Link to={`/teams/${team.id}`} className="flex-1 text-center py-3 bg-primary text-white font-headline font-bold rounded-xl hover:bg-primary-container transition-colors">Details</Link>
              {team.isMember && <span className="px-4 py-3 bg-tertiary-fixed-dim/20 text-on-tertiary-fixed rounded-xl font-bold text-sm">Member</span>}
            </div>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20">
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
      </select>
    </div>
  );
}

function Info({ icon, text }) {
  return <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">{icon}</span><span>{text}</span></div>;
}
