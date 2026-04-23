import React from "react";
import { Link } from "react-router-dom";

export default function CreateTeamPage() {
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
            className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-900 rounded-lg shadow-sm font-headline font-bold text-base translate-x-1"
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
              Team Builder
            </span>

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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsYRnPa_TxkEgKhPNAmPz7_w8VOCHDRrA41gjTbFxt41QWkbDm7TxPGfR39axJYDp3L88W58RuEUjrfCxQlOZV-Ku3d9etVwZrzW40wiQLcblBQJfszTVMuT4jf93mhVn6A-pStbyDR4O-brD7wEt1xFSJYbGfBUAWF_lVJqKsW73rNEMj5eT9oHJtnL_zBe5jCC-mm5JmG1tB7DpqZOfmVkULSU4QLKhn5b57HNVWBYCbk-A0yZCQGxFb0bnJDnqNoVkCHgAFumlj"
              />
            </div>
          </div>
        </header>

        <div className="p-12 max-w-6xl mx-auto space-y-10">
          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                New Team
              </span>
              <span className="text-stone-400 text-sm font-label">
                Build your roster
              </span>
            </div>

            <h1 className="font-headline text-5xl leading-none text-primary">
              Create New Team
            </h1>

            <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">
              Build your roster and define your team’s presence in the platform.
              Start with the identity, the sport, the city, and the required
              number of players.
            </p>
          </section>

          {/* Content */}
          <section className="grid grid-cols-12 gap-6 items-start">
            {/* Form */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                        Team Name
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="e.g. Thunder Bay FC"
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 text-on-surface transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                        Description
                      </label>
                      <textarea
                        rows="4"
                        maxLength={255}
                        placeholder="Tell us about your team’s philosophy and history..."
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 text-on-surface transition-all resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                        Sport
                      </label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-surface-container-low border-none rounded-xl p-4 pr-10 focus:ring-2 focus:ring-primary/20 text-on-surface transition-all">
                          <option value="">Select Sport</option>
                          <option value="1">Soccer</option>
                          <option value="2">Basketball</option>
                          <option value="3">Volleyball</option>
                          <option value="4">Padel</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                        City
                      </label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-surface-container-low border-none rounded-xl p-4 pr-10 focus:ring-2 focus:ring-primary/20 text-on-surface transition-all">
                          <option value="">Select City</option>
                          <option value="1">New York</option>
                          <option value="2">London</option>
                          <option value="3">Madrid</option>
                          <option value="4">Berlin</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                          location_on
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-500 mb-2 ml-1 uppercase tracking-wide">
                        Required Players
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="1"
                          defaultValue={11}
                          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 text-on-surface transition-all"
                        />
                        <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                          Min: 1
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end gap-4 border-t border-stone-200">
                    <button
                      type="button"
                      className="px-8 py-4 text-stone-500 font-headline font-bold hover:text-primary transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                     
                      className="w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-[#0a1670] to-[#1A237E] text-white font-headline font-bold shadow-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
                    >
                      Create Team
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="relative overflow-hidden rounded-xl bg-surface-container-low h-[420px] flex flex-col justify-end p-8 shadow-sm">
                <div className="absolute inset-0 opacity-40">
                  <img
                    alt="Athletic focus"
                    className="w-full h-full object-cover grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJ-uP9t7ybo0LM6qQEbKJ9TQt-IKfpfESSLvFyUUK6u_GW898UGU2Lxdti_pXO2IxRpkm_hOD2o4HoVrZCtDtFGp6Ww9EBZdV9-a8qb30Y13ZItXdPyUQ8bJm-W63TljJl8ZYlLLpMqeVog1cZZ6p1PYl12udCp2RvoxqoXxunFA3pVsP5GFFZXWRBBLiOiN4MocfAbxgIDsktl_cdHNL4dcGzQLy0flUk3DadeygAPpvBFxAYafGnntovTxayeIS8ImpnCCogplD"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>

                <div className="relative z-10">
                  <span className="text-tertiary-fixed-dim text-xs font-bold uppercase tracking-widest mb-2 block">
                    Brand Identity
                  </span>
                  <h3 className="text-white text-2xl font-bold font-headline leading-tight">
                    Your team, your legacy.
                  </h3>
                  <p className="text-blue-100/80 text-sm mt-3 leading-relaxed">
                    Defining your team identity is the first step toward a
                    strong and recognizable presence.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-6 shadow-sm">
                <h4 className="text-on-surface font-bold font-headline mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">
                    verified
                  </span>
                  Quick Tips
                </h4>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-5 h-5 bg-tertiary-fixed-dim/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[12px] text-on-tertiary-fixed-variant">
                        check
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Choose a unique team name that represents your local
                      community or club identity.
                    </p>
                  </li>

                  <li className="flex gap-3">
                    <div className="w-5 h-5 bg-tertiary-fixed-dim/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[12px] text-on-tertiary-fixed-variant">
                        check
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      The required players count defines your minimum roster for
                      official participation.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}