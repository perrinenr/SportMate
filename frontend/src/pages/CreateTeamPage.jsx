import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox } from "../components/StateBox";
import { api } from "../services/api";

export default function CreateTeamPage() {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", sportId: "", cityId: "", requiredPlayers: 12 });

  useEffect(() => {
    Promise.all([api.get("/sports"), api.get("/cities")])
      .then(([sportData, cityData]) => { setSports(sportData); setCities(cityData); })
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.sportId || !form.cityId) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form, sportId: Number(form.sportId), cityId: Number(form.cityId), requiredPlayers: Number(form.requiredPlayers) };
      const data = await api.post("/teams", payload);
      navigate(`/teams/${data.teamId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Create Team" badge="New" subtitle="The team will be saved in the Teams table and the creator is automatically added as a member.">
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 bg-white p-8 rounded-xl shadow-sm space-y-6">
          <h3 className="font-headline font-semibold text-primary text-xl">Team Information</h3>
          <Input label="Team Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Beirut Strikers" />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Team goals, rules, preferred schedule..." />
        </section>

        <section className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-xl shadow-sm space-y-6">
          <h3 className="font-headline font-semibold text-primary text-xl">Sport & Roster</h3>
          <Select label="Sport" name="sportId" value={form.sportId} onChange={handleChange} options={sports} />
          <Select label="City" name="cityId" value={form.cityId} onChange={handleChange} options={cities} />
          <Input label="Max Members" name="requiredPlayers" type="number" min="2" value={form.requiredPlayers} onChange={handleChange} />
          <ErrorBox message={error} />
          <button disabled={loading} type="submit" className="w-full bg-primary text-white font-headline font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-70">
            {loading ? "Saving..." : "Create Team"}
          </button>
        </section>
      </form>
    </AppLayout>
  );
}

function Input({ label, ...props }) {
  return <div><label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">{label}</label><input {...props} className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20" /></div>;
}
function Textarea({ label, ...props }) {
  return <div><label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">{label}</label><textarea {...props} rows="5" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 resize-none" /></div>;
}
function Select({ label, name, value, onChange, options }) {
  return <div><label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">{label}</label><select name={name} value={value} onChange={onChange} className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20"><option value="">Choose {label}</option>{options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></div>;
}
