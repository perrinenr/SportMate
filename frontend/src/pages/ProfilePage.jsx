import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${currentUser.id}/profile`)
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentUser.id]);

  return (
    <AppLayout
      title="Profile"
      badge="Dynamic"
      actions={<Link to="/profile/edit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Edit Profile</Link>}
    >
      {loading && <LoadingBox />}
      <ErrorBox message={error} />

      {profile && (
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-primary rounded-xl p-8 text-white shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
            <div className="w-28 h-28 rounded-full bg-white text-primary flex items-center justify-center font-headline font-black text-3xl overflow-hidden mb-6">
              {profile.profileImage ? <img alt="Profile" src={profile.profileImage} className="w-full h-full object-cover" /> : `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase()}
            </div>
            <h2 className="font-headline text-3xl font-bold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-blue-100/90 mt-1">{profile.email}</p>
            <p className="text-blue-100/90 mt-6 leading-relaxed">{profile.bio || "No bio yet. Add one from Edit Profile."}</p>
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail icon="mail" label="Email" value={profile.email} />
              <Detail icon="phone" label="Phone" value={profile.phone || "Not set"} />
              <Detail icon="location_on" label="City" value={profile.cityName || "Not set"} />
              <Detail icon="calendar_month" label="Member Since" value={new Date(profile.createdAt).toLocaleDateString()} />
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-headline text-2xl text-primary font-bold mb-6">Activity From Database</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Joined Matches" value={profile.stats.joinedMatches} />
                <Stat label="Created Matches" value={profile.stats.createdMatches} />
                <Stat label="Joined Teams" value={profile.stats.joinedTeams} />
                <Stat label="Created Teams" value={profile.stats.createdTeams} />
              </div>
            </div>
          </div>
        </section>
      )}
    </AppLayout>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-5">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">{label}</p>
      <p className="font-headline text-lg font-bold text-primary mt-1 break-words">{value}</p>
    </div>
  );
}

function Stat({ label, value }) {
  return <div className="bg-surface-container-low rounded-xl p-5"><p className="font-headline text-3xl font-black text-primary">{value}</p><p className="text-xs text-stone-500 font-bold uppercase tracking-widest mt-2">{label}</p></div>;
}
