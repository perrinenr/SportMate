import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { EmptyBox, ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
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
    api.get(`/matches${query}`)
      .then(setMatches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <AppLayout
      title="Matches"
      badge={`${matches.length} loaded`}
      actions={<Link to="/matches/create" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Create Match</Link>}
    >
      <section className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select label="Sport" value={filters.sportId} onChange={(value) => setFilters((p) => ({ ...p, sportId: value }))} options={sports} />
        <Select label="City" value={filters.cityId} onChange={(value) => setFilters((p) => ({ ...p, cityId: value }))} options={cities} />
        <button onClick={() => setFilters({ sportId: "", cityId: "" })} className="self-end bg-surface-container-low rounded-xl px-4 py-3 font-bold text-primary">Reset filters</button>
      </section>

      {loading && <LoadingBox />}
      <ErrorBox message={error} />
      {!loading && !error && matches.length === 0 && <EmptyBox text="No matches found. Create a match to add data." />}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.map((match) => (
          <article key={match.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">sports_soccer</span>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${match.isFull ? "bg-error-container text-error" : "bg-tertiary-fixed-dim/20 text-on-tertiary-fixed"}`}>
                {match.isFull ? "Full" : `${match.spotsLeft} spots left`}
              </span>
            </div>

            <h3 className="text-xl font-headline font-bold text-primary mb-2">{match.title}</h3>
            <p className="text-sm text-on-surface-variant mb-5 line-clamp-2">{match.description || "No description provided."}</p>

            <div className="space-y-2 text-sm text-on-surface-variant mb-6">
              <Info icon="sports" text={match.sportName} />
              <Info icon="location_on" text={`${match.cityName}${match.locationDetails ? ` • ${match.locationDetails}` : ""}`} />
              <Info icon="schedule" text={new Date(match.matchDate).toLocaleString()} />
              <Info icon="groups" text={`${match.participantsCount}/${match.requiredPlayers} players • ${match.requiredLevel}`} />
            </div>

            <div className="flex gap-3">
              <Link to={`/matches/${match.id}`} className="flex-1 text-center py-3 bg-primary text-white font-headline font-bold rounded-xl hover:bg-primary-container transition-colors">
                Details
              </Link>
              {match.isJoined && <span className="px-4 py-3 bg-tertiary-fixed-dim/20 text-on-tertiary-fixed rounded-xl font-bold text-sm">Joined</span>}
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
