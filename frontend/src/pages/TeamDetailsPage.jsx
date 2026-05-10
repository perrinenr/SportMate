import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ErrorBox, LoadingBox } from "../components/StateBox";
import { api } from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function TeamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadTeam = useCallback(() => {
    setLoading(true);
    setError("");

    api
      .get(`/teams/${id}`)
      .then(setTeam)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const isOwner =
    team && currentUser && Number(team.createdBy) === Number(currentUser.id);

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

  const leaveTeam = async () => {
    setLeaving(true);
    setError("");
    setMessage("");

    try {
      const data = await api.delete(`/teams/${id}/leave`);
      setMessage(data.message);
      loadTeam();
    } catch (err) {
      setError(err.message);
    } finally {
      setLeaving(false);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const deleteTeam = async () => {
    setDeleting(true);
    setError("");
    setMessage("");

    try {
      await api.delete(`/teams/${id}`);
      setShowDeleteModal(false);
      navigate("/teams");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <AppLayout
        title="Team Details"
        badge={team?.sportName || "Roster"}
        subtitle="Team details and roster are loaded from the backend. The join button writes to TeamMembers."
        actions={
          <Link
            to="/teams"
            className="bg-surface-container-low text-primary px-4 py-2 rounded-lg font-bold"
          >
            Back
          </Link>
        }
      >
        {loading && <LoadingBox />}

        <ErrorBox message={error} />

        {message && (
          <div className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed rounded-xl p-4 font-semibold">
            {message}
          </div>
        )}

        {team && (
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {team.sportName}
                  </span>

                  <span className="text-stone-400 text-sm">
                    Created by {team.creatorName}
                  </span>
                </div>

                <h2 className="font-headline text-4xl text-primary font-extrabold">
                  {team.name}
                </h2>

                <p className="text-on-surface-variant mt-4 leading-relaxed">
                  {team.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Detail icon="sports" label="Sport" value={team.sportName} />

                <Detail
                  icon="location_on"
                  label="City"
                  value={team.cityName}
                />

                <Detail
                  icon="groups"
                  label="Members"
                  value={`${team.membersCount}/${team.requiredPlayers}`}
                />

                <Detail
                  icon="event_available"
                  label="Spots Left"
                  value={team.spotsLeft}
                />
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-primary rounded-xl p-8 text-white shadow-[0_12px_40px_rgba(0,6,102,0.15)]">
                <h3 className="font-headline text-2xl font-bold mb-2">
                  Team actions
                </h3>

                <p className="text-blue-100/90 mb-6">
                  You can join, leave, or delete this team depending on your
                  permissions.
                </p>

                {!team.isMember && !team.isFull && (
                  <button
                    disabled={joining}
                    onClick={joinTeam}
                    className="w-full bg-white text-primary font-bold py-3 rounded-xl disabled:opacity-60"
                  >
                    {joining ? "Joining..." : "Join Team"}
                  </button>
                )}

                {team.isMember && (
                  <button
                    disabled={leaving}
                    onClick={leaveTeam}
                    className="w-full bg-white text-primary font-bold py-3 rounded-xl disabled:opacity-60"
                  >
                    {leaving ? "Leaving..." : "Leave Team"}
                  </button>
                )}

                {!team.isMember && team.isFull && (
                  <button
                    disabled
                    className="w-full bg-white text-primary font-bold py-3 rounded-xl opacity-60"
                  >
                    Team Full
                  </button>
                )}

                {isOwner && (
                  <button
                    disabled={deleting}
                    onClick={openDeleteModal}
                    className="w-full mt-3 bg-red-600 text-white font-bold py-3 rounded-xl disabled:opacity-60"
                  >
                    {deleting ? "Deleting..." : "Delete Team"}
                  </button>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-headline text-xl text-primary font-bold mb-4">
                  Members
                </h3>

                <div className="space-y-3">
                  {team.members.length === 0 && (
                    <p className="text-stone-500 text-sm">No members yet.</p>
                  )}

                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                        {member.profileImage ? (
                          <img
                            alt={member.name}
                            src={member.profileImage}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          member.name.slice(0, 2).toUpperCase()
                        )}
                      </div>

                      <div>
                        <p className="font-bold text-primary text-sm">
                          {member.name}
                        </p>

                        <p className="text-xs text-stone-500">
                          Joined {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        )}
      </AppLayout>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <span className="material-symbols-outlined text-red-600">
                delete
              </span>
            </div>

            <h2 className="font-headline text-2xl font-extrabold text-primary">
              Delete this team?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              This action cannot be undone. The team and its members will be
              removed permanently.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 rounded-xl bg-surface-container-low px-5 py-3 font-bold text-primary disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteTeam}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-5">
      <span className="material-symbols-outlined text-primary">{icon}</span>

      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">
        {label}
      </p>

      <p className="font-headline text-lg font-bold text-primary mt-1">
        {value}
      </p>
    </div>
  );
}