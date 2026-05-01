import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";

export default function TeamDetailsPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const loadTeam = useCallback(() => {
    setLoading(true);
    setError("");
    api.get(`/teams/${id}`)
      .then(setTeam)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { loadTeam(); }, [loadTeam]);

  const joinTeam = async () => {
    setJoining(true);
    setError("");
    setMessage("");
    try {
      const data = await api.post(`/teams/${id}/join`, {});
      setMessage(data.message);
      loadTeam();
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  };

  return (
    <AppLayout
      title="Team Details"
      badge={team?.sportName || "Roster"}
      subtitle="Team details and roster are loaded from the backend. The join button writes to TeamMembers."
      actions={<Link to="/teams" className="bg-surface-container-low text-primary px-4 py-2 rounded-lg font-bold">Back</Link>}
    >
      {loading && <LoadingBox />}
      <ErrorBox message={error} />
      {message && <div className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed rounded-xl p-4 font-semibold">{message}</div>}

      {team && (
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{team.sportName}</span>
                <span className="text-stone-400 text-sm">Created by {team.creatorName}</span>
              </div>
              <h2 className="font-headline text-4xl text-primary font-extrabold">{team.name}</h2>
              <p className="text-on-surface-variant mt-4 leading-relaxed">{team.description || "No description provided."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail icon="sports" label="Sport" value={team.sportName} />
              <Detail icon="location_on" label="City" value={team.cityName} />
              <Detail icon="groups" label="Members" value={`${team.membersCount}/${team.requiredPlayers}`} />
              <Detail icon="event_available" label="Spots Left" value={team.spotsLeft} />
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-primary rounded-xl p-8 text-white shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
              <h3 className="font-headline text-2xl font-bold mb-2">Join this team</h3>
              <p className="text-blue-100/90 mb-6">Join checks if the team exists, if you are already a member, and if the roster still has space.</p>
              <button disabled={joining || team.isMember || team.isFull} onClick={joinTeam} className="w-full bg-white text-primary font-bold py-3 rounded-xl disabled:opacity-60">
                {team.isMember ? "Already Member" : team.isFull ? "Team Full" : joining ? "Joining..." : "Join Team"}
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-headline text-xl text-primary font-bold mb-4">Members</h3>
              <div className="space-y-3">
                {team.members.length === 0 && <p className="text-stone-500 text-sm">No members yet.</p>}
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                      {member.profileImage ? <img alt={member.name} src={member.profileImage} className="w-full h-full object-cover" /> : member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">{member.name}</p>
                      <p className="text-xs text-stone-500">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
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
      <p className="font-headline text-lg font-bold text-primary mt-1">{value}</p>
    </div>
  );
}
