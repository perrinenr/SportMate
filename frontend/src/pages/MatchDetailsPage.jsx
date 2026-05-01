import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";

export default function MatchDetailsPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const loadMatch = useCallback(() => {
    setLoading(true);
    setError("");
    api.get(`/matches/${id}`)
      .then(setMatch)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { loadMatch(); }, [loadMatch]);

  const joinMatch = async () => {
    setJoining(true);
    setError("");
    setMessage("");
    try {
      const data = await api.post(`/matches/${id}/join`, {});
      setMessage(data.message);
      loadMatch();
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  };

  return (
    <AppLayout
      title="Match Details"
      badge={match?.sportName || "Details"}
      subtitle="All information, participants, and join action are connected to the backend."
      actions={<Link to="/matches" className="bg-surface-container-low text-primary px-4 py-2 rounded-lg font-bold">Back</Link>}
    >
      {loading && <LoadingBox />}
      <ErrorBox message={error} />
      {message && <div className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed rounded-xl p-4 font-semibold">{message}</div>}

      {match && (
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{match.requiredLevel}</span>
                <span className="text-stone-400 text-sm">Created by {match.creatorName}</span>
              </div>
              <h2 className="font-headline text-4xl text-primary font-extrabold">{match.title}</h2>
              <p className="text-on-surface-variant mt-4 leading-relaxed">{match.description || "No description provided."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail icon="sports_soccer" label="Sport" value={match.sportName} />
              <Detail icon="location_on" label="City" value={match.cityName} />
              <Detail icon="pin_drop" label="Location" value={match.locationDetails || "Not specified"} />
              <Detail icon="schedule" label="Date" value={new Date(match.matchDate).toLocaleString()} />
              <Detail icon="groups" label="Players" value={`${match.participantsCount}/${match.requiredPlayers}`} />
              <Detail icon="event_available" label="Spots Left" value={match.spotsLeft} />
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-primary rounded-xl p-8 text-white shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
              <h3 className="font-headline text-2xl font-bold mb-2">Join this match</h3>
              <p className="text-blue-100/90 mb-6">Join checks if the match exists, if you are already in it, and if spots are available.</p>
              <button disabled={joining || match.isJoined || match.isFull} onClick={joinMatch} className="w-full bg-white text-primary font-bold py-3 rounded-xl disabled:opacity-60">
                {match.isJoined ? "Already Joined" : match.isFull ? "Match Full" : joining ? "Joining..." : "Join Match"}
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-headline text-xl text-primary font-bold mb-4">Participants</h3>
              <div className="space-y-3">
                {match.participants.length === 0 && <p className="text-stone-500 text-sm">No participants yet.</p>}
                {match.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                      {participant.profileImage ? <img alt={participant.name} src={participant.profileImage} className="w-full h-full object-cover" /> : participant.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">{participant.name}</p>
                      <p className="text-xs text-stone-500">Joined {new Date(participant.joinedAt).toLocaleDateString()}</p>
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
