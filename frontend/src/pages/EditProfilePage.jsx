import React from "react";
import { Link , useNavigate } from "react-router-dom";



export default function EditProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-100 flex flex-col p-6 gap-8 z-50">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline font-extrabold text-2xl text-indigo-950">
            SportMate
          </h1>
          <p className="font-label text-xs text-stone-500 uppercase tracking-widest">
            Management Suite
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link
            to="/matches"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">sports_soccer</span>
            Matches
          </Link>

          <Link
            to="/teams"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">groups</span>
            Teams
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
          >
            <span className="material-symbols-outlined">account_circle</span>
            Profile
          </Link>
        </nav>

        <div className="mt-auto">
          <Link
            to="/matches/create"
            className="block w-full text-center bg-gradient-primary text-on-primary py-4 rounded-xl font-headline font-bold shadow-lg active:scale-95 transition-transform"
          >
            Create Match
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-grow min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">
              Profile Studio
            </span>

            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                className="bg-stone-100 border-none rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 w-64 font-body"
                placeholder="Search matches, teams, players..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <Link
              to="/settings"
              className="p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined">settings</span>
            </Link>

            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 ring-2 ring-stone-200">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqqNdjfJkFizqPGySSXwqDFg5YjNWc8_XQ3oT3bx0g_6yNKcYmVqGa8cdYP9gkLChG-zzNIZiv3Dpho4J-TCAvvHDmt9Pre8Tj2t2-SwNTVBir0GOU9i7HsPtTKlWeL26Vd1l5qf-Ubtzc6FpWzsU9ziE3RpU4GgEif7MJMykLeeeuGh8cyNK_V17YVE6npFMF-T4BSQFjr5ONiu4aMUPfuRxpg_1rYsyCkrs8XbZa4HZab5bnzld_EWHiWAxrjL0K-bkDyRVaWQs2"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-6xl mx-auto space-y-10">
          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Profile
              </span>
              <span className="text-stone-400 text-sm font-label">
                Personal settings
              </span>
            </div>

            <h1 className="font-headline text-5xl leading-none text-primary">
              Edit Profile
            </h1>

            <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
              Manage your identity, visibility, and sports presence from one
              place.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
                <div className="relative group cursor-pointer mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-surface-container-low">
                    <img
                      id="profile-preview"
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeVTJmtYtJOxwD1irygv9plJH3qpd33Ldm5LFjJPevVEuKDcM9U0hxdTB4ytuCbOgZdywojRqkEjo56Hec9LejRsawUtWOKvIe3F1d0yx03hPIxtrKXtQvAGCPlkVGYi1coHkqN3qMvqLisn3yyFucpWU1PGCxpTZp-Khh9llhDVsB9Tr1c-vWrQy69zBFXgLQlgykPUhHPt7VvI6QLPyOz3vrbAJ-3ZN1kGUjoLEdhYfFtDPRMx68z7VvgIh5ZkDGG7FGsV5lw_4Y"
                    />
                  </div>

                  <div className="absolute inset-0 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl">
                      add_a_photo
                    </span>
                  </div>
                </div>

                <h3 className="font-headline font-bold text-xl text-primary mb-1">
                  Alex Thompson
                </h3>
                <p className="text-sm text-stone-500 font-label mb-4">
                  Striker • Premium Member
                </p>

                <div className="w-full bg-surface-container-low rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-xs font-label text-stone-500 mb-2">
                    <span>Profile Completion</span>
                    <span className="text-on-tertiary-container font-bold">
                      85%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary-fixed-dim"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <button className="text-primary font-label text-sm font-semibold hover:underline">
                  Change Avatar
                </button>
              </div>

              <div className="bg-surface-container-low rounded-xl p-6 shadow-sm">
                <h4 className="font-headline font-bold text-sm text-primary mb-4 uppercase tracking-widest">
                  Account Privacy
                </h4>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-body">Public Profile</span>
                  <div className="w-10 h-5 bg-tertiary-fixed-dim rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-body">Show Stats</span>
                  <div className="w-10 h-5 bg-tertiary-fixed-dim rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-8">
              <form className="bg-surface-container-lowest rounded-xl p-8 lg:p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label
                      className="block text-xs font-label font-bold text-primary uppercase tracking-widest"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue="Alex"
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 ring-primary/20 font-body text-on-surface"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-xs font-label font-bold text-primary uppercase tracking-widest"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue="Thompson"
                      className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 ring-primary/20 font-body text-on-surface"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label
                      className="block text-xs font-label font-bold text-primary uppercase tracking-widest"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        mail
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="alex.thompson@curator.io"
                        className="w-full bg-surface-container-low border-none rounded-xl pl-11 pr-4 py-3 focus:ring-2 ring-primary/20 font-body text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-xs font-label font-bold text-primary uppercase tracking-widest"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        call
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue="+1 (555) 0123-456"
                        className="w-full bg-surface-container-low border-none rounded-xl pl-11 pr-4 py-3 focus:ring-2 ring-primary/20 font-body text-on-surface"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-10">
                  <label
                    className="block text-xs font-label font-bold text-primary uppercase tracking-widest"
                    htmlFor="bio"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    defaultValue="Versatile striker with 10 years of semi-pro experience. Passionate about team dynamics and local tournament growth. Looking to join a competitive weekend league team."
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 ring-primary/20 font-body text-on-surface resize-none"
                  />
                  <p className="text-[10px] text-right text-stone-400 font-label uppercase tracking-tighter">
                    154 / 255 Characters
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl text-stone-500 font-headline font-bold hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-[#0a1670] to-[#1A237E] text-white font-headline font-bold shadow-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Bottom cards */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low/60 p-6 rounded-xl flex items-start gap-4 shadow-sm">
                <span className="material-symbols-outlined text-on-tertiary-container bg-tertiary-fixed-dim/20 p-2 rounded-lg">
                  security
                </span>
                <div>
                  <h5 className="font-bold text-sm text-primary mb-1">
                    Secure Account
                  </h5>
                  <p className="text-xs text-stone-500 font-body">
                    Your data is protected with strong security and access
                    controls.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low/60 p-6 rounded-xl flex items-start gap-4 shadow-sm">
                <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-2 rounded-lg">
                  verified
                </span>
                <div>
                  <h5 className="font-bold text-sm text-primary mb-1">
                    Pro Visibility
                  </h5>
                  <p className="text-xs text-stone-500 font-body">
                    Strong profiles usually get more attention from teams and
                    match organizers.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low/60 p-6 rounded-xl flex items-start gap-4 shadow-sm">
                <span className="material-symbols-outlined text-secondary bg-secondary-fixed/30 p-2 rounded-lg">
                  group_work
                </span>
                <div>
                  <h5 className="font-bold text-sm text-primary mb-1">
                    Team Access
                  </h5>
                  <p className="text-xs text-stone-500 font-body">
                    A better bio helps captains understand your role and fit in
                    the squad.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}