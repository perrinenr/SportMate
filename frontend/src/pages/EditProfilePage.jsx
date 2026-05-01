import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";
import { getCurrentUser, updateCurrentUser } from "../services/auth";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", profileImage: "", bio: "", cityId: "" });

  useEffect(() => {
    Promise.all([api.get(`/users/${currentUser.id}/profile`), api.get("/cities")])
      .then(([profile, cityData]) => {
        setCities(cityData);
        setForm({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          phone: profile.phone || "",
          profileImage: profile.profileImage || "",
          bio: profile.bio || "",
          cityId: profile.cityId || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser.id]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName) {
      setError("First name and last name are required.");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...form, cityId: form.cityId ? Number(form.cityId) : null };
      const data = await api.put(`/users/${currentUser.id}/profile`, payload);
      updateCurrentUser(data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout title="Edit Profile" badge="Update">
      {loading && <LoadingBox />}
      <ErrorBox message={error} />

      {!loading && (
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
          <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm space-y-6">
            <h3 className="font-headline font-semibold text-primary text-xl">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
              <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Profile Image URL" name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." />
            <Textarea label="Bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Tell other players about you..." />
          </section>

          <section className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 shadow-sm space-y-6">
            <h3 className="font-headline font-semibold text-primary text-xl">Location</h3>
            <div>
              <label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">City</label>
              <select name="cityId" value={form.cityId} onChange={handleChange} className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20">
                <option value="">Choose city</option>
                {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
            </div>
            <button disabled={saving} type="submit" className="w-full bg-primary text-white font-headline font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-70">
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </section>
        </form>
      )}
    </AppLayout>
  );
}

function Input({ label, ...props }) {
  return <div><label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">{label}</label><input {...props} className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20" /></div>;
}
function Textarea({ label, ...props }) {
  return <div><label className="block text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">{label}</label><textarea {...props} rows="6" className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 resize-none" /></div>;
}
