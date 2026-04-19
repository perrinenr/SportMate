import React from "react";
import { Link } from "react-router-dom";

export default function CreateMatchPage() {
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
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
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
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-all duration-200 rounded-lg font-headline font-semibold text-base hover:translate-x-1"
          >
            <span className="material-symbols-outlined">account_circle</span>
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-grow min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">
              Match Engine
            </span>

            <div className="flex items-center gap-2 text-sm text-stone-400">
              <span>/</span>
              <span className="font-label">New Entry</span>
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
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXisyrbfSzMLfT8lef8ipamr9-Jf2n2kawkkVSEhYVjJo4Ewmblks581CUToEMVxvHPCRo9p80wvcOLt7fvmNrNqY5ke-LMxay-uUkzlXu2yAfiJcqMz8g1o9NsKRI9HEeexidABbqiyJmNUww8_oweKp0lBL_UrLz-A8-fdsuVsjCmiVKTghBBB3_OVAdJvd1cDrli3xI5UEDsLZE_Br3Diq88NY1PtPmvTiKXpVkMH8cbNQYYul8BNet0Uu33mT335RFMrysy5rs"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-5xl mx-auto space-y-10">
          {/* Hero */}
          <section className="space-y-3 relative">
            <div className="absolute -left-6 top-1 w-1 h-12 bg-tertiary-fixed-dim rounded-full"></div>

            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                New Match
              </span>
              <span className="text-stone-400 text-sm font-label">
                Match publishing form
              </span>
            </div>

            <h1 className="font-headline text-5xl leading-none text-primary">
              Create New Match
            </h1>

            <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
              Configure your event details. Once created, the match will be
              visible to players in the selected city and level bracket.
            </p>
          </section>

          <form className="space-y-8">
            {/* Top Section */}
            <section className="grid grid-cols-12 gap-6">
              {/* General info */}
              <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">
                <h3 className="font-headline font-semibold text-primary text-xl">
                  General Information
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sunday Morning Premier Scrimmage"
                      className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium placeholder:text-outline"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Outline match rules, equipment needed, or team color preferences..."
                      className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface font-medium placeholder:text-outline resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Side panel */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-surface-container-low p-6 rounded-xl shadow-sm space-y-4">
                  <h3 className="font-headline font-semibold text-stone-400 text-sm uppercase tracking-widest">
                    Sport & Skill
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-wide">
                      Discipline
                    </label>
                    <select className="w-full bg-surface-container-lowest border-none rounded-xl p-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all">
                      <option>Soccer (11v11)</option>
                      <option>Soccer (5v5)</option>
                      <option>Tennis (Singles)</option>
                      <option>Basketball (Full Court)</option>
                      <option>Padel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-3 uppercase tracking-wide">
                      Required Level
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface text-xs font-bold hover:bg-primary-fixed transition-colors"
                      >
                        Beginner
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md"
                      >
                        Intermediate
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface text-xs font-bold hover:bg-primary-fixed transition-colors"
                      >
                        Advanced
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl shadow-sm h-52 relative bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    alt="Venue Preview"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcp-zZ_foZ3izR3i9okVfM8c2f5M82R08fY67AZko1CwIcaQM2gnvXw2kdPehPWl8e9YIHqX_n6bEdlY2tk20ka5z1dnrZiRMM4iceNu0rYuzem3Box7_YjohU6-56P3teAS-ThXU_zecOkuH3zGNYSivYIcNjBTYfbVWIXIYV3IEEHZQY7E5j6iD6fJwmG27E7Xn6ZogDjRBEoorDgatoxo5fQLM2ZWuI6PCEnlEOgVuy_8-uPAYxB48U7TujJKVOHvyQ3Dga2qTC"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                      Venue Preview
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
                <label className="flex items-center gap-2 font-headline font-semibold text-primary text-lg mb-5">
                  <span className="material-symbols-outlined text-base">
                    location_on
                  </span>
                  Location Details
                </label>

                <div className="space-y-4">
                  <select className="w-full bg-surface-container-low border-none rounded-xl p-4 font-medium focus:ring-2 focus:ring-primary/20">
                    <option>London, UK</option>
                    <option>Manchester, UK</option>
                    <option>Madrid, Spain</option>
                    <option>Berlin, Germany</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Address or Pitch Number"
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 font-medium focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
                <label className="flex items-center gap-2 font-headline font-semibold text-primary text-lg mb-5">
                  <span className="material-symbols-outlined text-base">
                    calendar_today
                  </span>
                  Date & Time
                </label>

                <div className="space-y-4">
                  <input
                    type="datetime-local"
                    className="w-full bg-surface-container-low border-none rounded-xl p-4 font-medium focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-stone-500 italic">
                    Schedule is based on your local timezone.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
                <label className="flex items-center gap-2 font-headline font-semibold text-primary text-lg mb-5">
                  <span className="material-symbols-outlined text-base">
                    group_add
                  </span>
                  Roster Specs
                </label>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      defaultValue={22}
                      className="w-full bg-surface-container-low border-none rounded-xl p-4 font-medium focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 uppercase">
                      Players
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-tertiary-fixed/20 rounded-xl">
                    <span className="material-symbols-outlined text-on-tertiary-container text-lg">
                      verified
                    </span>
                    <span className="text-xs font-semibold text-on-tertiary-container">
                      Smart-match matchmaking enabled
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="flex items-center justify-end gap-4 pt-8 border-t border-stone-200">
              <button
                type="button"
                className="text-stone-500 font-headline font-bold hover:text-primary transition-colors px-6 py-3"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-[#0a1670] to-[#1A237E] text-white font-headline font-bold shadow-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Publish Match
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </button>
            </section>
          </form>
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-40 -left-20 w-64 h-64 bg-tertiary-fixed-dim/10 rounded-full blur-[80px] pointer-events-none"></div>
      </main>
    </div>
  );
}